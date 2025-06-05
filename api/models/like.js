const mongoose = require("mongoose");

const { Schema } = mongoose;

const LikeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetID: {
    type: Schema.Types.ObjectId,
    // no ref can ref post or comment
    required: true
  },
  targetType: {
    type: String,
    enum: ['Post', 'Comment'],
    required: true
  }
}, {
  // Adds createdAt and updatedAt automatically!! automatic and also makes createdAt immutable 
  timestamps: true, 
  // explicit definition of collection to avoid confusion
  collection: 'likes'
});


const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;