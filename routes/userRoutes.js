const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

// user management router
router.get("/", protect, adminOnly, getUsers); // get all users (admin only)
router.get("/:id", protect, adminOnly, getUserById); // get specific user
router.delete("/:id", protect, adminOnly, deleteUser); // delete user (admin only)

module.exports = router;