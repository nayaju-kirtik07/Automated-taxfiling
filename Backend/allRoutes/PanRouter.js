const PanController = require("../controller/panDetails");
const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleWare");

const router = express.Router();
const api = process.env.API_URL;

router.post(`${api}/addPan`, PanController.addPanNo);

module.exports = router;
