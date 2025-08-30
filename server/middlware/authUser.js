import jwt from "jsonwebtoken"


const authUser = async (req, res, next) =>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({success: false, message: "Not authorized, no token"});
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecoded.id){
            // req.body.userId = tokenDecoded.id;
            req.user = {id:tokenDecoded.id}
        }else{
            return res.status(401).json({success: false, message: "Not authorized, invalid token"});
        }
        next();
    } catch (error) {
      res.status(500).json({success: false, message: error.message});
    }
}

export default authUser;