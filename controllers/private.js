const User = require("../models/User");
const Chat = require("../models/Chat");
const Group = require("../models/Group");

module.exports.finduser_post = async (req , res) =>{
    try {
        const user = await User.findOne({username:req.body.username});
        console.log(user);
        let preChat=false;
        let chatid;
        let isBlocked=false;
        let blockUser=false;
        user.chatsId.forEach(chatId=>{
            if(chatId.name === req.user.username){
                
                preChat=true;
                chatid=chatId._id;
            }
        })
        user.blockedUser.forEach(user=>{
            if(user === req.user.username){
                isBlocked=true;
            }
        })
        req.user.blockedUser.forEach(user=>{
            if(user === req.body.username){
                blockUser=true;
            }
        })
        console.log(isBlocked)
        res.status(201).json({ username: user.username,  preChat, chatid, isBlocked, blockUser});
    } catch (err) {
        console.log(err)
       
    }
}
//create a new chat and add the chat id to users record
module.exports.newchat_post= async (req, res) =>{
    try {
        let newchat=false;
        const users=[];
        users.push(req.user.username);
        users.push(req.body.username);
        const chat = await  Chat.create({users});    
        
        const receiverUser = await User.findOne({username:req.body.username});
        receiverUser.chatsId.push({name:req.user.username, _id:chat._id, chatType:"singleuser"})
        receiverUser.save();

        req.user.chatsId.push({name:receiverUser.username, _id:chat._id, chatType:"singleuser"});
        req.user.save();
        newchat=true;
        res.status(201).json({ newchat });
    } catch (err) {
        console.log(err.message)
       
    }
}

module.exports.blockuser_post=async(req, res)=>{
   try{
    req.user.blockedUser.push(req.body.username);
    req.user.save();
    res.status(201).json({ msg:"user blocked" });

   }catch(err){
       console.log(err.message)
   }
}
module.exports.unblockuser_post=async(req, res)=>{
    try{
        req.user.blockedUser=  req.user.blockedUser.filter(user=>user != req.body.username);
        req.user.save();
        res.status(201).json({ msg:"user unblocked" });

    }catch(err){
        console.log(err.message)

    }

}

module.exports.creategroup_post=async(req, res)=>{
    try{
        
        const group = await Group.create({groupname:req.body.groupname});
        group.users.push(req.user.username);    
        group.save();
        req.user.chatsId.push({name:group.groupname, _id:group._id, chatType:"group"});
        req.user.save();
        res.status(201).json({ chatlist: req.user.chatsId});


    }catch(err){
        console.log(err);
    }
}

module.exports.findgroup_post=async(req, res)=>{
    try{
        const group = await Group.findById(req.body.groupid);

        res.status(201).json({ chatlist: req.user.chatsId});

    }catch(err){

    }
}

module.exports.messages_get=async (req, res) =>{
    try{
        const chat = await Chat.findById(req.params.chatId);
        if(chat.users.includes(req.user.username)){
            res.status(201).json({ messages:chat.messages });
        }else{
            res.status(401);
        }

    }catch(err){
        console.log(err);
    }
}
module.exports.userinfo_get=async (req, res) =>{
    try{ 
        res.status(201).json({ username: req.user.username }); 
    }catch(err){
        console.log(err);
    }
}
module.exports.chatlist_get=async (req, res)=>{
    try{ 
        res.status(201).json({ chatlist: req.user.chatsId }); 
    }catch(err){
        console.log(err);
    }
}