const jwt = require("jsonwebtoken")
const userModel = require("../models/User")

const isLoggedIn = async (req,res,next)=>{
    if(!req.cookies.token){
        res.json({
            status: "failed",
            message: "You are not logged in"
        })
    }

    
        let decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let user = await userModel.findOne({email: decode.email}).select("-password");//password will not selected or fetched

        req.user = user;
        next();
    
    
}

module.exports = {isLoggedIn};