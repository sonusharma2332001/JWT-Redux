import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTokens.js';
import User from '../Models/userModel.js';


// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} =req.body;
    const user  = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400);
        throw new Error('invalid email or password')
    }
});


// @desc Auth user/set token
// route POST /api/users/
// @access Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email:email})
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }
    console.log(req.body);
});


// @desc Log out user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({message:'user LoggedOut '})
});


// @desc get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:'user profile'})
});


// @desc update use profile
// route put /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:'update user profile'})
});

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile
};