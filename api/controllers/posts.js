const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");
const fs = require("fs");


// GET ALL POSTS all with control structure to also get by userID or targetUserID

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
    // Conditionally set the query parameters for Post.find 
    if (!targetUserID) {
      query.userID = { $in: allowedUserIDs };
      // }
    } else {
      // PROFILE PAGE: Show ALL posts on the specified user's wall
      query.targetUserID = targetUserID;
    }

    // then find all or with relevant parameters
    const posts = await Post.find(query)
          .populate('userID', 'basicInfo photos.profilePicture photos.profilePictureUrl') // Populate user info
          .populate('targetUserID', 'basicInfo photos.profilePicture photos.profilePictureUrl') // Populate targeUserinfo
          .sort({ createdAt: -1 }); 
    // generate token and send status
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token, count: posts.length });
  } 
  catch(err) {
    console.error(err);
    res.status(400).json({message: "Something went wrong", error: err.message})
  }
}

// GET POST BY TYPE

async function getPostsByType(req, res) {
  try {
    const { targetUserID, postType } = req.query;
    const query = {
      targetUserID: targetUserID,
      postType: postType
    };
    // then find all or with relevant parameters
    const posts = await Post.find(query)
          .populate('targetUserID', 'basicInfo') // Populate targeUserinfo
          .sort({ createdAt: -1 }); 
    // generate token and send status
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token, count: posts.length });
  } 
  catch(err) {
    console.error(err);
    res.status(400).json({message: "Something went wrong", error: err.message})
  }
}


//GET POST BY ID

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

//LIKE POST

async function likePost(req, res) {
  try {
    // set userID to current logged in user
    const userID = req.user_id;
    // postid data sent from the request
    const postID = req.body.postID;
    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      // $addToSet prevents duplicates
      { $addToSet: { likes: userID } }, 
      // Return the updated document
      { new: true } 
    // populate user info for posts to be returned properly
    ).populate('userID', 'basicInfo photos.profilePicture photos.profilePictureUrl') 
    .populate('targetUserID', 'basicInfo photos.profilePicture photos.profilePictureUrl') 
    if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
    }

    const token = generateToken(req.user_id);
    res.status(200).json({ post: updatedPost, token: token});
  } 
  catch(err) {
      console.error(err);
      res.status(400).json({message: "Something went wrong", error: err.message})
  }
}


// UNLIKE POST

async function unlikePost(req, res) {
  try {
    // set userID to current logged in user
    const userID = req.user_id;
    // postid data sent from the request
    const postID = req.body.postID;
    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      // pull userID from the likes array
      { $pull: { likes: userID } }, 
      // Return the updated document
      { new: true } 
    // populate user info for posts to be returned properly
    ).populate('userID', 'basicInfo photos.profilePicture photos.profilePictureUrl') 
    .populate('targetUserID', 'basicInfo photos.profilePicture photos.profilePictureUrl') 
    if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
    }

    const token = generateToken(req.user_id);
    res.status(200).json({ post: updatedPost, token: token});
  } 
  catch(err) {
      console.error(err);
      res.status(400).json({message: "Something went wrong", error: err.message})
  }
}


// CREATE POST

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
      postType: postType || "post"
    };

    // If image was uploaded, add the file path
    if (req.file) {
      postData.imagePath = req.file.path; 
    }
    // create new post
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
  getPostsByType: getPostsByType,
  getPostByID: getPostByID,
  likePost: likePost,
  unlikePost: unlikePost,
  createPost: createPost
};

module.exports = PostsController;
