const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

// GET all with control structure to also get by userID or targetUserID
async function getAllPosts(req, res) {
  try {
    const { userID, targetUserID, postType } = req.query;
    const user = req.user_id;
    const query = {};
    // find current user from user_id and select only the friends array field
    const currentUser = await User.findById(user).select('friends');
    // if user not found in db return error
    if (!currentUser) {
      return res.status(404).json({ 
          message: "User not found" 
        })}
    // create allowed users variable - array of user ids of user plus their friends
    const allowedUserIDs = [user, ...currentUser.friends];
    // Modify query so that it will only return posts where the userID field matches any ObjID in allowedUserIDs array
    query.userID = { $in: allowedUserIDs };

    //filter by userID for situation just see own post
    if (userID) query.userID = userID;
    // filter by targetUserID for walls
    if (targetUserID) query.targetUserID = targetUserID;
    // filter by postType - for status v post
    if (postType) query.postType = postType;
    // then find all or with relevant parameters
  
    const posts = await Post.find(query)
          .populate('userID', 'basicInfo') // Populate user info
          .populate('targetUserID', 'basicInfo') // Populate targeUserinfo
          .sort({ createdAt: -1 }); // Most recent first
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token, count: posts.length });
  } 
  catch(err) {
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
    // get req bosy data
    const content = req.body.content
    const image = req.body.image
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
    // if image uploaded add to the postData
    if (image) {
      postData.image = req.body.image;
    }
    const post = new Post(postData);
    post.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Post created", token: newToken });
  } 
  catch(err) {
    console.error(err);
    res.status(400).json({message: "Something went wrong", error: err.message})
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
