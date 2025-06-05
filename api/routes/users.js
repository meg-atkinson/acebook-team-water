const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.get("/", UsersController.getAllUsers);

router.get("/:id", UsersController.getUserByID);

router.post("/", UsersController.create);

module.exports = router;
