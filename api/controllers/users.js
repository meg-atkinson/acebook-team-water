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
      },
});

await user.save();

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
}

const UsersController = {
  getCurrentUser: getCurrentUser,
  create: create,
  getAllUsers: getAllUsers,
  getUserByID: getUserByID,
  uploadMiddleware: upload.single('profilePicture')
};

module.exports = UsersController;


