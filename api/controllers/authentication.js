const User = require("../models/user");
const { generateToken } = require("../lib/token");
const bcrypt = require('bcrypt')
const saltRounds = 10;

async function createToken(req, res) {
  const email = req.body.email;
  const password = req.body.password;

try {
  const user = await User.findOne({ email: email });

  if (!user) {
    console.log("Auth Error: User not found");
    res.status(401).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    console.log("Auth Error: Passwords do not match");
    return res.status(401).json({ message: "Password incorrect" });
    }

    const token = generateToken(user.id);
    res.status(201).json({ token: token, message: "OK" });

} 
catch (err) {
  console.error("Login error:", err);
  res.status(500).json({ message: "Internal server error" })
}
}
  


const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
