const mongoose = require("mongoose");


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

  postType: {
    type: String,
    enum: ['status', 'post'],
    default: 'post'
  },

  imagePath: {
        type: String,
        default: null
    },

  likes:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  // EXTRA JUST NOTES - FOR FUTURE

  isEdited: {
    type: Boolean,
    default: false
  },
  

}, {
  // Adds createdAt and updatedAt automatically!! automatic and also makes createdAt immutable 
  timestamps: true, 
  // explicit definition of collection to avoid confusion
  collection: 'posts'
});

// virtual to get the like count
PostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// virtual to access imageUrl from the front end more easily
PostSchema.virtual('imageUrl').get(function() {
    if (this.imagePath) {
        return `http://localhost:3000/${this.imagePath}`;
    }
    return null;
});

//NOTES//
// // Indexes for better query performance
// PostSchema.index({ createdBy: 1, createdAt: -1 }); // User's posts by date
// PostSchema.index({ createdFor: 1, createdAt: -1 }); // Posts on user's profile by date
// PostSchema.index({ createdAt: -1 }); // All posts by date (timeline)

// // Virtual to check if post is on own wall
// PostSchema.virtual('isOwnProfile').get(function() {
//   return this.userID.toString() === this.targetUserID.toString();
// });

// Pre-save middleware to update timestamps
PostSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
    this.isEdited = true;
  }
  next();
});

// Configures the schema to include virtuals when converting to JSON:
PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });


// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;