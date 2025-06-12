const mongoose = require("mongoose");

const basicInfoSchema = mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required: true},
    pronouns: {type: String, required: true},
    relStatus: {type: String},
    birthday: {type: Date, required: true},
    homeTown: {type: String, required: true}
});

const otherInfoSchema = mongoose.Schema({
    interests: {type: String, default: ""},
    music: {type: String, default: ""},
    food: {type: String, default: ""},
    tvShows: {type: String, default: ""},
    movies: {type: String, default: ""},
    quote: {type: String, default: ""}
});

const photoSchema = mongoose.Schema({
    profilePicture: {type: String},
    otherPhotos: [{type: String}]
});

const prodSchema = mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    basicInfo: basicInfoSchema,
    otherInfo: otherInfoSchema,
    photos: photoSchema,
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    friendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    prods: [prodSchema]
});

// Virtual to access profile pic URL
photoSchema.virtual('profilePictureUrl').get(function() {
    if (this.profilePicture) {
        return `http://localhost:3000/${this.profilePicture}`;
    }
    return null;
});

// Virtual for other photos URLs (returns array of full URLs) - needed yet?
photoSchema.virtual('otherPhotosUrls').get(function() {
    if (this.otherPhotos && this.otherPhotos.length > 0) {
        return this.otherPhotos.map(photo => `http://localhost:3000/${photo}`);
    }
    return [];
});

// Set virtuals on both schemas to make sure return w JSON
photoSchema.set('toJSON', { virtuals: true });
photoSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });


const User = mongoose.model("User", UserSchema);

module.exports = User;
