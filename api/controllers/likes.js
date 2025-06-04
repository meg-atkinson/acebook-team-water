const Like = require("../models/like");
const { generateToken } = require("../lib/token");

async function getAllLikes(req, res) {
  const likes = await Like.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ likes: likes, token: token });
}

async function createLike(req, res) {
  const like = new Like(req.body);
  like.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ content: "Like created", token: newToken });
}

const LikesController = {
  getAllLikes: getAllLikes,
  createLike: createLike,
};

module.exports = LikesController;