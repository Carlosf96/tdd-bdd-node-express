const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 8,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 8,
    unique: true,
  },
  age: {
    type: Number,
    minimum: 1,
    required: true,
  },
});

module.exports.User = mongoose.model('Agent', userSchema)