const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
// const PostSchema = new mongoose.Schema({
//   message: String,
// });

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}` }).save();

// module.exports = Post;
const { Schema } = mongoose;
const PostSchema = new Schema({
  // nb mongoose autocreates an _id which is an ObjectID type
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: [2000, 'Post content cannot exceed 2000 characters'],
    minlength: [1, 'Post content cannot be empty']
  },
  
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  targetUserID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // EXTRA JUST NOTES - FOR FUTURE

  isEdited: {
    type: Boolean,
    default: false
  },
  
  // isDeleted: {
  //   type: Boolean,
  //   default: false
  // },
  
  // deletedAt: {
  //   type: Date,
  //   default: null
  // },
  

}, {
  // Adds createdAt and updatedAt automatically!! automatic and also makes createdAt immutable 
  timestamps: true, 
  // explicit definition of collection to avoid confusion
  collection: 'posts'
});

// // Indexes for better query performance
// PostSchema.index({ createdBy: 1, createdAt: -1 }); // User's posts by date
// PostSchema.index({ createdFor: 1, createdAt: -1 }); // Posts on user's profile by date
// PostSchema.index({ createdAt: -1 }); // All posts by date (timeline)
// PostSchema.index({ 'likedBy.user': 1 }); // Posts liked by user
// PostSchema.index({ 'comments.user': 1 }); // Posts commented by user
// PostSchema.index({ 'tags.user': 1 }); // Posts user is tagged in
// PostSchema.index({ isDeleted: 1 }); // Filter out deleted posts

// // Compound indexes
// PostSchema.index({ createdBy: 1,  createdAt: -1 });
// PostSchema.index({ createdFor: 1, isDeleted: 1, createdAt: -1 });

// // Virtual for like count
// PostSchema.virtual('likeCount').get(function() {
//   return this.likedBy ? this.likedBy.length : 0;
// });

// // Virtual for comment count
// PostSchema.virtual('commentCount').get(function() {
//   return this.comments ? this.comments.length : 0;
// });

// // Virtual to check if post is on own wall
// PostSchema.virtual('isOwnProfile').get(function() {
//   return this.createdBy.toString() === this.createdFor.toString();
// });

// Pre-save middleware to update timestamps
PostSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
    this.isEdited = true;
  }
  next();
});

// // Static method to find posts by user
// PostSchema.statics.findByUser = function(userId, includeDeleted = false) {
//   const query = { createdBy: userId };
//   if (!includeDeleted) {
//     query.isDeleted = false;
//   }
//   return this.find(query).sort({ createdAt: -1 });
// };

// // Static method to find posts on user's profile
// PostSchema.statics.findOnProfile = function(userId, includeDeleted = false) {
//   const query = { createdFor: userId };
//   if (!includeDeleted) {
//     query.isDeleted = false;
//   }
//   return this.find(query).sort({ createdAt: -1 });
// };

// // Static method to get timeline posts for user (friends' posts)
// PostSchema.statics.getTimeline = function(userFriends) {
//   return this.find({
//     createdBy: { $in: userFriends },
//     isDeleted: false
//   }).sort({ createdAt: -1 });
// };

// // Instance method to check if user liked the post
// PostSchema.methods.isLikedBy = function(userId) {
//   return this.likedBy.some(like => like.user.toString() === userId.toString());
// };

// // Instance method to check if user can view the post
// postSchema.methods.canView = function(viewerId, viewerFriends = []) {
//   // User can always view their own posts
//   if (this.createdBy.toString() === viewerId.toString()) return true;
//   // User can view posts by their friends
//   return viewerFriends.includes(this.createdBy.toString());
// };

// // Ensure virtual fields are serialized
// PostSchema.set('toJSON', { virtuals: true });
// PostSchema.set('toObject', { virtuals: true });


// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;