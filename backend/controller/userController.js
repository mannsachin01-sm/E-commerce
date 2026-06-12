const User = require("../models/user_model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            phone: user.phone,
            message: user.message,
            isAdmin: user.isAdmin,
            isPrime: user.isPrime,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const signup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { _id: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 7200000 });

        res.status(201).json({
            message: 'User created successfully!',
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin,
            },
            token,
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 7200000 });

        res.status(200).json({
            message: 'Login successful!',
            user,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const forget = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error });
    }
};

const updateAccount = async (req, res) => {
    try {
        const { email, password, username, state, city, address } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.username = username || user.username;
        user.address = { state, city, streetAddress: address } || user.address;

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email is already taken' });
            }
            user.email = email;
        }

        await user.save();

        res.json({ message: 'Account updated successfully', user });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const createContact = async (req, res) => {
    try {
        const { email, message } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.message.push(message);
        await user.save();

        res.json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error });
    }
};

module.exports = { signup, login, getUserById, getUser, forget, deleteUser, createContact, updateAccount };
