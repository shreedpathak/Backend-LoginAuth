import asyncHandler from "express-async-handler";
import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const currentUser = asyncHandler(async (req, res) => {
    console.log("middleWare2");
    res.status(200).json({ message: `this message is from currentUser request` });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and Password are mandatory");
    }

    // Find user by email
    const user = await User.findOne({ email }); // Add `await`

    if (user && (await bcryptjs.compare(password, user.password))) {
        // Generate token
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "18m" }
        );

        console.log("You are logged in successfully");
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Credentials are wrong");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        console.log("User already exists");
        throw new Error("User already exists");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashPassword);

    // Create new user
    const newUser = await User.create({
        username,
        email,
        password: hashPassword,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

export { currentUser, loginUser, registerUser };
