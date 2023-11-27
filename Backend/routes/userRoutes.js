import express from 'express'
const router = express.Router();
import {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logOutUser',logoutUser);
router.route('/profile',authUser)
.get(protect,getUserProfile)
.put(protect,updateUserProfile);

export default router;