const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

const { loginUser, getProfile } = require("../controllers/login");

router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;