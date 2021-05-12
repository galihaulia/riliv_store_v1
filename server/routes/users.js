const express = require("express");
const { authenticate } = require("../middleware/auth")
const router = express.Router();
const {
    getAllUsers,
    getDataUser
} = require("../controllers/users");

router.get("/users", authenticate, getAllUsers);
router.get("/user", authenticate, getDataUser);

module.exports = router;