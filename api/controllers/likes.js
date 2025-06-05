const Like = require("../models/like");
const { generateToken } = require("../lib/token");

//get all / get all by userID / get all by targetID
async function getAllLikes(req, res) {
  const { userID, targetID } = req.query;
  const query = {};
  //filter by userID
  if (userID) query.userID = userID;
  // filter by postID
  if (targetID) query.targetID = targetID;
  // then find all or with relevant parameters
  const likes = await Like.find(query)
        .sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ likes: likes, token: token });
}

async function getLikeByID(req, res) {
  const like = await Like.findById(req.params.id)
  const token = generateToken(req.user_id);
  res.status(200).json({ like: like, token: token});
}

async function createLike(req, res) {
  const like = new Like(req.body);
  like.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ content: "Like created", token: newToken });
}

const LikesController = {
  getAllLikes: getAllLikes,
  getLikeByID: getLikeByID,
  createLike: createLike,
};

module.exports = LikesController;