const User = require("../models/User");

module.exports.finduser_post = async (req , res) =>{
    try {
        const user = await User.findOne({username:req.body.username});
        console.log(user)
        res.status(201).json({ username: user.username });
    } catch (err) {
        console.log(err.message)
       
    }
}