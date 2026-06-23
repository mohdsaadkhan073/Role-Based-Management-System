const express = require("express");
const router = express.Router();
const {
    createRole,
    getAllRoles,
    assignRole,
    updateRole
} = require("../controllers/role");
const authMiddleware = require("../middleware/authMiddleware");
const permissionAuth = require("../middleware/permissionAuth")

router.post("/createRole", authMiddleware, permissionAuth("role.createRole"), createRole);
router.get("/getAllRoles", authMiddleware, permissionAuth("role.getAllRoles"), getAllRoles);
router.put("/assignRole/:id", authMiddleware, permissionAuth("role.assignRole"), assignRole);
router.put("/updateRole/:id", authMiddleware, permissionAuth("role.updateRole"), updateRole);

module.exports = router;