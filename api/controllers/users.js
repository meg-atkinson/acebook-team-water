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
    } else {
      profilePicturePath = 'uploads/images/blank-profile-picture-973460_1280.webp'; // set your default path here
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

    // Add full image URLs !!! check this it seemed to be breaking earlier..
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

// const getMyProfile = async (req,res) => {
//   try {
//     const user = await User.findById(req.user_id).select('_id name email basicInfo photos friends');
    
//     res.status(200).json(user)
//   } catch (error) {
//     console.error("Failed to fetch user profile", error);
//     res.status(500).json({message: "Internal server error"})
//   }
// };


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

    // check if the user objects exist
    await User.findByIdAndUpdate(
      req.user_id,
      {
        $setOnInsert: {
          otherInfo: {
            interests: "",
            music: "",
            food: "",
            tvShows: "",
            movies: "",
            quote: ""
          }
        }
      },
      { usert: false }
    );

    // update object fields
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

// Friend request controllers:
// Add friend (create friends request), update friendsRequest array
const putFriendRequest = async (req, res) => {
  try {
    const senderId = req.user_id;
    const receiverId = req.params.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'MIssing sender or rceiver id'});
    }
    

    // Create new friend update object
    const updatedReceiver = await User.findByIdAndUpdate(receiverId,
      { $push: { 'friendRequests': senderId } },
      { new: true }
    );

    if (!updatedReceiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    res.status(200).json({ message: "Friend request sent", updatedReceiver });

    
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" });
  }
};

// Accept a friend request, aka remove from friendRequests array and add to Friend's array
const putAcceptFriend = async (req, res) => {
  try {
    const receiverId = req.user_id;
    const senderId = req.params.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'MIssing sender or rceiver id'});
    }

    const updatedReceiver = await User.findByIdAndUpdate(receiverId,
      { 
        $pull: { 'friendRequests': senderId }, // first remove sender from friendRequests
        $push: { 'friends': senderId } // secondly, add sender to friends
      }, 
      { new: true }
    );

    const updatedSender = await User.findByIdAndUpdate(senderId,
      { $push: { 'friends': receiverId } },
      { new: true }
    );

    res.status(200).json({ message: "Friend added", updatedReceiver, updatedSender});

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" });
  }
}


// Reject a friend request, aka remove sender's id from friendsRequest arrray
const putRejectFriend = async (req, res) => {
  try {
    const receiverId = req.user_id;
    const senderId = req.params.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'MIssing sender or rceiver id'});
    }

    const updatedReceiver = await User.findByIdAndUpdate(receiverId,
      { $pull: { 'friendRequests': senderId} }, 
      { new: true }
    )

    res.status(200).json({ message: "Request rejected", updatedReceiver });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" });
  }
  
}


const UsersController = {
  getCurrentUser: getCurrentUser,
  create: create,
  getAllUsers: getAllUsers,
  getUserByID: getUserByID,
  updateBasicInfo: updateBasicInfo,
  updateOtherInfo: updateOtherInfo,
  uploadMiddleware: upload.single('profilePicture'),
  putFriendRequest: putFriendRequest,
  putAcceptFriend: putAcceptFriend,
  putRejectRequest: putRejectFriend
};

module.exports = UsersController;


