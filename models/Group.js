const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    groupname: String,
    users: [String],
    messages: [{text: String, user: String}]
});

  
  
const Group = mongoose.model('group', groupSchema);

module.exports = Group;  