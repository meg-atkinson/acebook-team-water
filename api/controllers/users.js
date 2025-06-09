const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { generateToken } = require("../lib/token")

async function create(req, res){

  try{
     const {email, password, basicInfo} = req.body

      const formattedBasicInfo = {
      ...basicInfo,
      birthday: new Date(basicInfo.birthday),
    };


    const hash = await bcrypt.hash(password, saltRounds);


  const user = new User({
  email: email, 
  password: hash,
  basicInfo: formattedBasicInfo,
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
    const user = await User.findById(req.params.id).populate("friends", "basicInfo");
    const token = generateToken(req.user_id);
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}


const getMyProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user_id).select('_id name email basicInfo friends');
    res.status(200).json(user)
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    res.status(500).json({message: "Internal server error"})
  }
}

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getUserByID: getUserByID,
  getMyProfile: getMyProfile
};

module.exports = UsersController;
