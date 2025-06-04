const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

async function getAllComments(req, res) {
  const comments = await Comment.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ comments: comments, token: token });
}

async function createComment(req, res) {
  const comment = new Comment(req.body);
  comment.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ content: "Comment created", token: newToken });
}

const CommentsController = {
  getAllComments: getAllComments,
  createComment: createComment,
};

module.exports = CommentsController;