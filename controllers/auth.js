const User = require("../models/User");
const jwt = require('jsonwebtoken');

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "2 days"
      });
}
//check the errors for showing to the user
const checkEmailError = (error)=>{
    let errorMessage = ""
    if(error.message.includes("email") && error.code === 11000 ){
        errorMessage = "This email is already sign up";
    }
    if(error.message.includes("enter a valid")){
        errorMessage = "Please enter a valid email";
    }
    return errorMessage;
}
const checkUsernameErr = (error)=>{
    let errorMessage = "";
    if(error.message.includes("username") && error.code === 11000){
        errorMessage = "This username is already exists";
    }
    return errorMessage;
}
const checkPassError = (error)=>{
    let errorMessage = ""
    if(error.includes("char")){
        errorMessage = "Your password should be at least 6 char"
    }

    return errorMessage;
}


module.exports.signup_post = async(req , res) =>{
    try {
        const { username, email, password } = req.body;
        const user = await  User.create({username, email, password });     
        const token = createToken(user._id);

       
        res.status(201).json({ username, token });
    } catch (err) {
        console.log(err.message)
        let error = {passwordError:checkPassError(err.message), emailError: checkEmailError(err), usernameError:checkUsernameErr(err)};
        res.status(400).json({ error });
    }
}

module.exports.login_post =async (req , res) =>{
    try {
        const user = await User.login(req.body.email, req.body.password)          
        const token = createToken(user._id);
        
        res.status(200).json({ username: user.username, token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
     
}