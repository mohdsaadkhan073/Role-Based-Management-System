const express = require("express");
const router = express.Router();
const createRole = require("../controllers/role");

router.post("/createRole", createRole);

module.exports = router;