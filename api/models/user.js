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
    interests: [{type: String}],
    music: [{type: String}],
    food: [{type: String}],
    tvShows: [{type: String}],
    movies: [{type: String}],
    quote: {type: String}

});

const photoSchema = mongoose.Schema({
    profilePicture: {type: String},
    otherPhotos: [{type: String}]
})

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    basicInfo: basicInfoSchema,
    otherInfo: otherInfoSchema,
    photos: photoSchema,
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
