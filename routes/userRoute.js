const express = require("express");
const { getAllUsers, registerController, loginController, getOneUser } = require("../controller/userController");

const router = express.Router();

router.get("/all-users", getAllUsers);  

router.get("/get-user/:id", getOneUser);

router.post("/register", registerController);

router.post("/login", loginController);

module.exports = router;