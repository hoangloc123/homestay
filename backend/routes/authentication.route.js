import express from 'express';
import {logIn, signUp} from '../firebase/authentication.js';
import {Role} from "../constants/role.constant.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password, metadata } = req.body;

    if (!email || !password || !metadata) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!metadata.roles || !Array.isArray(metadata.roles) || metadata.roles.some(role => !Object.values(Role).includes(role))) {
        return res.status(400).json({
            message: 'Invalid roles. Roles must be an array and each role must be one of the following: ' + Object.values(Role).join(', ')
        });
    }

    try {
        await signUp(email, password, metadata);
        res.status(201).json({ message: 'User created successfully. Verification email sent.' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Failed to sign up user.', error: error.message });
    }
});

// router.post('/logout', async (req, res) => {
//     try {
//         await logOut();
//         res.status(200).json({ message: 'Logged out successfully.' });
//     } catch (error) {
//         console.error('Error logging out user:', error);
//         res.status(500).json({ message: 'Failed to log out.', error: error.message });
//     }
// });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const userCredential = await logIn(email, password);
        res.status(200).json({ user: userCredential.user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(401).json({ message: 'Failed to log in.', error: error.message });
    }
});

export default router;
