const jwt = require("jsonwebtoken");
const User = require("../models/User");


const checkUser  = async (req, res , next)=>{  
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await User.findById(decoded.id);
    
        if (!user) {
          return ;
        }
        req.user = user;
        next();
      } catch (err) {
        return;
      }
}

module.exports = {checkUser}