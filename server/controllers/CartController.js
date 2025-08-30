import User from "../models/User.model.js";



//Update user CartData : api/cart/update
export const updateCart = async (req, res) =>{
    try {
        const {userId, cartItems} = req.body;
        await User.findByIdAndUpdate(userId,{cartItems})
        return res.status(200).json({success:true,message:"cart Updated"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}