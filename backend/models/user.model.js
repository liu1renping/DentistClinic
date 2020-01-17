const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // trim off white spaces
      minlength: 3
    }
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;
