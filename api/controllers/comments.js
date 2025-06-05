const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

// getall or all by userID or all by postID
async function getAllComments(req, res) {
  const { userID, postID } = req.query;
  const query = {};
  //filter by userID
  if (userID) query.userID = userID;
  // filter by postID
  if (postID) query.postID = postID;
  // then find all or with relevant parameters
  const comments = await Comment.find(query)
        .sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ comments: comments, token: token });
}

async function getCommentByID(req, res) {
  const comment = await Comment.findById(req.params.id)
  const token = generateToken(req.user_id);
  res.status(200).json({ comment: comment, token: token});
}

async function createComment(req, res) {
  const comment = new Comment(req.body);
  comment.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ content: "Comment created", token: newToken });
}

const CommentsController = {
  getAllComments: getAllComments,
  getCommentByID: getCommentByID,
  createComment: createComment,
};

module.exports = CommentsController;