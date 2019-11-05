const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 12,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 12,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports.User = mongoose.model('Agent', userSchema)