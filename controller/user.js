const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

//create user
exports.create =asyncHandler(async (req, res) => {
    const { name, email, password, phone, username, skills, bio } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email already in use by another user" });
        }

        const formattedPhone = phone.startsWith('+91 ') ? phone : `+91 ${phone}`;

        const user = await User.create({
            name,
            email,
            password,
            phone: formattedPhone,
            username,
            skills,
            bio,
            image
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});




//login with email or phone with passowrd
exports.login = asyncHandler(async (req, res) => {
    const { email, password,phone } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (!user) {
            return res.status(400).json({ invalid: true, message: "Invalid email or phone" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const userDetails = {
                userId: user.userId,
                name: user.name,
                email: user.email,
                _id: user._id,
                phone: user.phone,
                image: user.image,
                password: password,
                username: user.username,
                skills: user.skills,
                bio: user.bio,
            };
            const token = jwt.sign(userDetails, process.env.JWT_SECRETKEY, { expiresIn: "7d" });
            res.status(200).json({ token, user: userDetails });
        } else {
            res.status(400).json({ invalid: true, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//get all users
exports.getAll = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//get user by id
exports.get = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//update user by id
exports.update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, username, skills, bio } = req.body;
    const image = req.file ? req.file.filename : null;

    try {   
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.username = username || user.username;
        user.skills = skills || user.skills;
        user.bio = bio || user.bio;
        user.image = image || user.image;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//delete user by id
exports.delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//delete all users
exports.deleteAll = asyncHandler(async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});