const User = require("../models/User");
const Chat = require("../models/Chat");

module.exports.finduser_post = async (req , res) =>{
    try {
        const user = await User.findOne({username:req.body.username});
        console.log(user);
        const preChat=false;
        user.chatsId.forEach(chatId=>{
            if(chatId.username === req.user.username){
                preChat=true;
            }
        })
        res.status(201).json({ username: user.username,  });
    } catch (err) {
        console.log(err.message)
       
    }
}
//create a new chat and add the chat id to users record
module.exports.newchat_post= async (req , res) =>{
    try {
        let newchat=false;
        const users=[];
        users.push(req.user.username);
        users.push(req.body.username);
        const chat = await  Chat.create({users});    
        
        const receiverUser = await User.findOne({username:req.body.username});
        receiverUser.chatsId.push({name:req.user.username, _id:chat._id})
        receiverUser.save();

        req.user.chatsId.push({name:receiverUser.username, _id:chat._id});
        req.user.save();
        newchat=true;
        res.status(201).json({ newchat });
    } catch (err) {
        console.log(err.message)
       
    }
}