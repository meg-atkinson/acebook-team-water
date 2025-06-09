const express = require("express");
const { create, uploadMiddleware } = require('../controllers/users');
const upload = require('../middleware/upload');

const UsersController = require("../controllers/users");

const router = express.Router();

router.get("/", UsersController.getAllUsers);

router.get("/:id", UsersController.getUserByID);

router.post('/', upload.single('profilePicture'), UsersController.create);

router.get("/me", UsersController.getMyProfile)

module.exports = router;
