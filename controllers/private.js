
module.exports.userinfo_post = async (req , res) =>{
    try {
        res.status(201).json({ userinfo: req.user });
    } catch (err) {
        console.log(err.message)
       
    }
}