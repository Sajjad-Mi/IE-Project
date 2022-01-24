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
    },
    chatsId: [{name:String, _id:mongoose.ObjectId, chatType:String}]
  });

  //hashing the password befor saving
  userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('email or password is wrong');
    }
    throw Error('email or password is wrong');
  };
  
  const User = mongoose.model('user', userSchema);

  module.exports = User;  