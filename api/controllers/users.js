const User = require("../models/user");

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const basicInfo = req.body.basicInfo;

  const user = new User({
  email, 
  password,
  basicInfo,
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
}

const UsersController = {
  create: create,
};

module.exports = UsersController;
