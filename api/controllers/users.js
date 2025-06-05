const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const saltRounds = 10;

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
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
};

const UsersController = {
  create: create,
  getAllUsers: getAllUsers
};

module.exports = UsersController;
