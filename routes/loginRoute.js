const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionAuth = require("../middleware/permissionAuth");

const { loginUser, getProfile, updateProfile, deleteUser, logoutUser, getAllUsers } = require("../controllers/login");

router.post("/login", loginUser);
router.get("/profile", authMiddleware, permissionAuth("user.getProfile"), getProfile);
router.put("/updateProfile", authMiddleware, permissionAuth("user.updateProfile"), updateProfile);
router.delete("/deleteUser", authMiddleware, permissionAuth("user.deleteUser"), deleteUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/getAllUsers", authMiddleware, permissionAuth("user.getAllUsers"), getAllUsers);

module.exports = router;