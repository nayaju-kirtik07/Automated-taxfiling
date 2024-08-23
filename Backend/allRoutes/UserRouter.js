const UserController = require("../controller/user");
const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleWare");

const router = express.Router();
const api = process.env.API_URL;

router.post(`${api}/signup`, UserController.singUp);
router.post(`${api}/login`, UserController.login);
router.get(`${api}/users`, authenticateToken, UserController.getAllUsers);
router.post(`${api}/uploadImage`, authenticateToken, UserController.editProfile);
router.get(`${api}/getMyProfile`, authenticateToken, UserController.getMyProfile);
// router.delete(`${api}/logOut`, authenticateToken, UserController.logOut);


module.exports = router;
