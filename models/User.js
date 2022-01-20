const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique:true
    },
    email: {
      type: String,
      unique: true

    },
    password: {
      type: String,
      minlength: [6, 'Your password shoud be at least 6 char'],
    }
  });

  
  const User = mongoose.model('user', userSchema);

  module.exports = User;  