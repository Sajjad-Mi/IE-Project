const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const io = require('socket.io')(server);

const authRoutes  = require('./routes/auth');
const privateRoutes = require('./routes/private');
const Chat = require("./models/Chat");
const Group = require("./models/Group");
const User = require("./models/User");
const jwt = require("jsonwebtoken");


require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(authRoutes);
app.use(privateRoutes);

//check the user before socket connection
io.use(async (socket, next)=>{   
  try{
    const token = socket.handshake.auth.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    socket.data.username = user.username;
    next();
  }catch(err){
    console.log(err);
  }
})

io.on('connection', socket => { 
  socket.on('joinRoom', ({roomId})=>{
    socket.join(roomId);
 
    socket.on('newMessage',async (chattext, isGroup)=>{
      const newMessage = {text:chattext, user: socket.data.username};
      let chat;
      if(isGroup){
        chat = await Group.findById(roomId);
      }else{
        chat = await Chat.findById(roomId);
      }
      chat.messages.push(newMessage);
      chat.save();
      socket.broadcast.to(roomId).emit('message', chattext)
    })
  })
})

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{
  server.listen(PORT);
})