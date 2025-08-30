import jwt from "jsonwebtoken"

//Seller Login : /api/seller/login
export const sellerLogin = async (req, res) =>{
    try {
    const {email, password} = req.body;

    if(password ===process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
      const token =jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('sellerToken', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(201).json({success:true,message:"Seller logged in"})
    }else{
        return res.status(400).json({success:false,message:"Seller not Found"})
    }
    } catch (error) {
      return res.status(500).json({success:false,message:error.message})
    }
}

// Check Authenticated Seller : /api/seller/is-auth
export const isSellerAuth = async (req, res) =>{
    try {
     
        return res.status(200).json({success: true, message:"Seller"});
    } catch (error) {
       console.log(error.message);
       return res.status(500).json({success: false, message: error.message}); 
    }
}

// Logout Selller : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.status(200).json({success: true, message: "Seller logged out successfully"});
    } catch (error) {
        console.log(error.message);
       return res.status(500).json({success: false, message: error.message}); 
    }
}