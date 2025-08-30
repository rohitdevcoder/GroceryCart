import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//register a new user : /api/user/register
export const register = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success: false, message: "All filds are required"});
        }
        const exsistingUser = await User.findOne({email});
        if(exsistingUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: '7d'})
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(201).json({success: true, message: "User registered successfully", user: {name: user.name, email: user.email}});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

// Login a user : /api/user/login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "User does not exist"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({success: false, message: "Password is not matching"});
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: '7d'})
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(201).json({success: true, message: "User Login successfully", user: {name: user.name, email: user.email}});

    } catch (error) {
       console.log(error.message);
       return res.status(500).json({success: false, message: error.message}); 
    }
}

// Check Authenticated User : /api/user/is-auth
export const isAuth = async (req, res) =>{
    const userId = req.user.id;
    try {
        // const { userId } = req.body;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({success: true, user});
    } catch (error) {
       console.log(error.message);
       return res.status(500).json({success: false, message: error.message}); 
    }
}

// Logout User : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.status(200).json({success: true, message: "User logged out successfully"});
    } catch (error) {
        console.log(error.message);
       return res.status(500).json({success: false, message: error.message}); 
    }
}