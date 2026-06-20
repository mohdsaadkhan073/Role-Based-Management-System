const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

const { loginUser, getProfile, updateProfile, deleteUser, logoutUser } = require("../controllers/login");

router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/updateProfile", authMiddleware, updateProfile);
router.delete("/deleteUser", authMiddleware, deleteUser);
router.post("/logout", authMiddleware, logoutUser)

module.exports = router;