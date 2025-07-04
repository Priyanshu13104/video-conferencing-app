import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

export const registerUser = async (req, res) => {
    console.log('Request Body:', req.body); // debug log
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashPass });

        const token = generateToken(newUser._id);
        res.status(201).json({
            user: { id: newUser._id, name: newUser.name },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.status(200).json({
            user: { id: user._id, name: user.name },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
