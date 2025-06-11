const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { generateToken } = require("../lib/token")
const multer = require('multer');

const upload = multer({ dest: 'uploads/images' });


async function getCurrentUser (req, res) {
    res.json({ 
    id: req.user_id
  });
}


async function create(req, res){

  try{
    const { email, password, firstName, lastName, pronouns, relStatus, birthday, homeTown } = req.body

    const hash = await bcrypt.hash(password, saltRounds);

    let profilePicturePath = null;
    if (req.file) {
      profilePicturePath = req.file.path; // multer saved file path
    }

  const user = new User({
  email: email, 
  password: hash,
  basicInfo: {
    firstName: firstName,
    lastName: lastName,
    pronouns: pronouns,
    relStatus: relStatus,
    birthday: new Date(birthday),
    homeTown: homeTown
  },
  photos: {
        profilePicture: profilePicturePath,
        otherPhotos: []
      },
});

await user.save();

if (user.photos.profilePicture) {
      await User.findByIdAndUpdate(user._id, {
        $push: { 'photos.otherPhotos': user.photos.profilePicture }
      });
    }

console.log("User created, id:", user._id.toString());
res.status(201).json({ message: "User created successfully" });

  }

catch(err){
  console.error(err);
  res.status(400).json({message: "Something went wrong", error: err.message})
}
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
};

// BAckend
// Return the user's corresponding User object, by their token?

//Frontend
// Pull out user's friends array
// Map over array and
// Destructure objects within array to retrieve object.firstName and object.lastName
const getUserByID = async (req, res) => {

  try {
    const user = await User.findById(req.params.id).populate("friends", "basicInfo photos");

    // // Add full image URLs !!! check this it seemed to be breaking earlier..
    // const userWithImageUrls = {
    //   ...user.toObject(),
    //   profileImageUrl: user.photos.profilePicture ? `${req.protocol}://${req.get('host')}/${user.photos.profilePicture}` : null
    // };
    const token = generateToken(req.user_id);
    res.status(200).json({ user: user, token: token });

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
};

const getMyProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user_id).select('_id name email basicInfo photos friends');
    
    res.status(200).json(user)
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    res.status(500).json({message: "Internal server error"})
  }
};


// udate user basicInfo
const updateBasicInfo = async (req, res) =>{
  try {
    const { firstName, lastName, pronouns, relStatus, birthday, homeTown } = req.body;

    // create update object with these fields
    const updateObj = {};
    if (firstName !== undefined) updateObj['basicInfo.firstName'] = firstName;
    if (lastName !== undefined) updateObj['basicInfo.lastName'] = lastName;
    if (pronouns !== undefined) updateObj['basicInfo.pronouns'] = pronouns;
    if (relStatus !== undefined) updateObj['basicInfo.relStatus'] = relStatus;
    if (birthday !== undefined) updateObj['basicInfo.birthday'] = new Date(birthday);
    if (homeTown !== undefined) updateObj['basicInfo.homeTown'] = homeTown;

    // Handle profile picture change if uploaded
    if (req.file) {
      updateObj['photos.profilePicture'] = req.file.path;
    }

    // update the info
    const updatedUser = await User.findByIdAndUpdate(
      req.user_id,
      { $set: updateObj },
      { new: true, runValidators: true }
    ).select('basicInfo photos');

    // success checks
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.file) {
      await User.findByIdAndUpdate(req.user_id, {
        $push: { 'photos.otherPhotos': req.file.path }
      });
    }
    res.status(200).json({
      message: "Basic info updated successfully",
      otherInfo: updatedUser.basicInfo
    });

  } catch (error) {
    console.error("Failed to update basic info:", error);
    res.status(500).json({
      message: "Failed to update basic info",
      error: error.message
    });
  }
}


// update user otherInfo
const updateOtherInfo = async (req, res) =>{
  try {
    const { interests, music, food, tvShows, movies, quote } = req.body;

    // create update object with these fields
    const updateObj = {};
    if (interests !== undefined) updateObj['otherInfo.interests'] = interests;
    if (music !== undefined) updateObj['otherInfo.music'] = music;
    if (food !== undefined) updateObj['otherInfo.food'] = food;
    if (tvShows !== undefined) updateObj['otherInfo.tvShows'] = tvShows;
    if (movies !== undefined) updateObj['otherInfo.movies'] = movies;
    if (quote !== undefined) updateObj['otherInfo.quote'] = quote;

    // update the info
    const updatedUser = await User.findByIdAndUpdate(
      req.user_id,
      { $set: updateObj },
      { new: true, runValidators: true }
    ).select('otherInfo');

    // success checks
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Other info updated successfully",
      otherInfo: updatedUser.otherInfo
    });

  } catch (error) {
    console.error("Failed to update other info:", error);
    res.status(500).json({
      message: "Failed to update other info",
      error: error.message
    });
  }
}



const UsersController = {
  getCurrentUser: getCurrentUser,
  create: create,
  getAllUsers: getAllUsers,
  getUserByID: getUserByID,
  updateBasicInfo: updateBasicInfo,
  updateOtherInfo: updateOtherInfo,
  uploadMiddleware: upload.single('profilePicture')
};

module.exports = UsersController;


