const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
   users: [String],
   messages: [{text: String, user: String}]
});

  
  
const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;  