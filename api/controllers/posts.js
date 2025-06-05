const Post = require("../models/post");
const { generateToken } = require("../lib/token");

// GET all with control structure to also get by userID or targetUserID
async function getAllPosts(req, res) {
  try {
    const { userID, targetUserID, postType } = req.query;
    const query = {};
    //filter by userID
    if (userID) query.userID = userID;
    // filter by targetUserID
    if (targetUserID) query.targetUserID = targetUserID;
    // filter by postType
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
    const post = new Post(req.body);
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
