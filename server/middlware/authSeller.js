import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) =>{
    const {sellerToken} = req.cookies;
    if(!sellerToken){
        return res.status(401).json({success: false, message: "Not authorized, no token"});
    }

       try {
            const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
            if(tokenDecoded.email === process.env.SELLER_EMAIL){
                 next();
            }else{
                return res.status(401).json({success: false, message: "Not authorized, invalid token"});
            }
        } catch (error) {
          res.status(500).json({success: false, message: error.message});
        }
}

export default authSeller;