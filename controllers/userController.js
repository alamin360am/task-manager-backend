const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async(req, res) => {
    try {
        const users = await User.find({role: "member"}).select("-password");

        // add task counts to each user
        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTask = await Task.countDocuments({assignedTo: user._id, status: "Pending"});
            const inProgressTask = await Task.countDocuments({assignedTo: user._id, status: "In Progress"});
            const completedTask = await Task.countDocuments({assignedTo: user._id, status: "Completed"});

            return {
                ...user._doc,
                pendingTask,
                inProgressTask,
                completedTask
            }
        }));

        res.json(usersWithTaskCounts);

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if(!user) return res.status(404).json({message: "User not found"});

        res.json(user);

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) return res.status(404).json({message: "User not found"});

        res.json({
            success: true,
            message: "User Deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

module.exports = {getUsers, getUserById, deleteUser}