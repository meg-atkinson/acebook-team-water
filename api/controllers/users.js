const User = require("../models/user");
const bcrypt = require('bcrypt')
const saltRounds = 10;

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const basicInfo = req.body.basicInfo;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

  const user = new User({
  email: email, 
  password: hash,
  basicInfo: basicInfo,
});

  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    }); 
});

  
}

const UsersController = {
  create: create,
};

module.exports = UsersController;
