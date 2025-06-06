const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find()
        .populate('userID', 'basicInfo') // Populate user info
        .sort({ createdAt: -1 }); // Most recent first
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token, count: posts.length });
}

async function getPostByID(req, res) {
  const post = await Post.findById(req.params.id)
  const token = generateToken(req.user_id);
  res.status(200).json({ post: post, token: token});
}


async function getPostsByUser(req, res) {
  const posts = await Post.find({ userID: req.params.userId })
        .populate('userID', 'basicInfo')
        .sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token, count: posts.length });
}

async function getPostsByTargetUser(req, res) {
  const posts = await Post.find({ userID: req.params.targetUserId })
        .populate('targetUserID', 'basicInfo')
        .sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token, count: posts.length });
}

async function createPost(req, res) {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}


const PostsController = {
  getAllPosts: getAllPosts,
  getPostByID: getPostByID,
  getPostsByUser: getPostsByUser,
  getPostsByTargetUser: getPostsByTargetUser,
  createPost: createPost,
};

module.exports = PostsController;
