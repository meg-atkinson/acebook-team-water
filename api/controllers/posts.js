const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");
const fs = require("fs");


// GET all with control structure to also get by userID or targetUserID
async function getAllPosts(req, res) {
  try {
    const { userID, targetUserID, postType } = req.query;
    const loggedInUserID = req.user_id; 
    // for homepage select only the friends array field for the logged in user
    const currentUser = await User.findById(loggedInUserID).select('friends');
    // if user not found in db return error
    if (!currentUser) {
      return res.status(404).json({ 
          message: "Logged-in user not found" 
        })}
    // create allowed users variable - array of user ids of user plus their friends
    const allowedUserIDs = [userID, ...currentUser.friends];
    let query = {};
    // Different scenarios:
    if (!targetUserID || targetUserID === "") {
      // HOME PAGE: Show all posts from logged-in user and their friends (feed)
      // Only use userID if it matches the logged-in user (for security)
      if (userID && userID === loggedInUserID) {
        query.userID = { $in: allowedUserIDs };
      } else {
        // Fallback: use logged-in user's feed
        query.userID = { $in: allowedUserIDs };
      }
    } else {
      // PROFILE PAGE: Show ALL posts on the specified user's wall
      query.targetUserID = targetUserID;
    }
    if (postType) {
      query.postType = postType;
    }

  // then find all or with relevant parameters
    const posts = await Post.find(query)
          .populate('userID', 'basicInfo photos.profilePicture') // Populate user info
          .populate('targetUserID', 'basicInfo photos.profilePicture') // Populate targeUserinfo
          .sort({ createdAt: -1 }); // Most recent first

    // Add full image URLs !!! check this
    const postsWithImageUrls = posts.map(post => ({
      ...post.toObject(),
      imageUrl: post.imagePath ? `${req.protocol}://${req.get('host')}/${post.imagePath}` : null
    }));

    const token = generateToken(req.user_id);
    res.status(200).json({ posts: postsWithImageUrls, token: token, count: postsWithImageUrls.length });
  } 
  catch(err) {
    // add more error handling for file upload
    console.error(err);
    res.status(400).json({message: "Something went wrong", error: err.message})
  }
}

async function getPostByID(req, res) {
  try {
    const post = await Post.findById(req.params.id)
    const token = generateToken(req.user_id);
    res.status(200).json({ post: post, token: token});
  } 
  catch(err) {
      console.error(err);
      res.status(400).json({message: "Something went wrong", error: err.message})
  }
}

async function createPost(req, res) {
  try {
    // set userID to current logged in user
    const userID = req.user_id;
    // get req body data
    const content = req.body.content
    let targetUserID = req.body.targetUserID
    const postType = req.body.postType
    // if targetUserID sent is false/null then set to userID
    if (!targetUserID) {
      targetUserID = userID;
    }
    // create post data from body and userIDs
    const postData = {
      content: content,
      userID: userID,
      targetUserID: targetUserID,
      postType: postType || "post",
    };

    // If image was uploaded, add the file path
    if (req.file) {
      postData.imagePath = req.file.path; // e.g., "uploads/images/post-1234567890-123456789.jpg"
    }

    const post = new Post(postData);
    const savedPost = await post.save();

    if (savedPost.imagePath) {
      await User.findByIdAndUpdate(userID, {
        $push: { 'photos.otherPhotos': savedPost.imagePath }
      });
    }

    const newToken = generateToken(req.user_id);
  
    res.status(201).json({ message: "Post created", post: savedPost, token: newToken });
  } 
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Something went wrong", error: err.message})
  }
}


const PostsController = {
  getAllPosts: getAllPosts,
  getPostByID: getPostByID,
  // getPostsByUser: getPostsByUser,
  // getPostsByTargetUser: getPostsByTargetUser,
  createPost: createPost,
};

module.exports = PostsController;







// OLD VERSIONS 

// async function getPostsByUser(req, res) {
//   const posts = await Post.find({ userID: req.params.userId })
//         .populate('userID', 'basicInfo')
//         .sort({ createdAt: -1 });
//   const token = generateToken(req.user_id);
//   res.status(200).json({ posts: posts, token: token, count: posts.length });
// }

// async function getPostsByTargetUser(req, res) {
//   const posts = await Post.find({ userID: req.params.targetUserId })
//         .populate('targetUserID', 'basicInfo')
//         .sort({ createdAt: -1 });
//   const token = generateToken(req.user_id);
//   res.status(200).json({ posts: posts, token: token, count: posts.length });
// }
