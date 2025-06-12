const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postID: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters'],
    minlength: [1, 'Comment cannot be empty']
  },
  likes:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  // not yet used
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null // null for top-level comments, commentId for replies
  }
}, {
  // Adds createdAt and updatedAt automatically!! automatic and also makes createdAt immutable 
  timestamps: true, 
  // explicit definition of collection to avoid confusion
  collection: 'comments'
});


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;