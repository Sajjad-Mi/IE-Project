const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique:true
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, 'Please enter a valid email']

    },
    password: {
      type: String,
      minlength: [6, 'Your password shoud be at least 6 char'],
    }
  });

  //hashing the password befor saving
  userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('username or password is wrong');
    }
    throw Error('username or password is wrong');
  };
  
  const User = mongoose.model('user', userSchema);

  module.exports = User;  