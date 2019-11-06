const mongoose = require('mongoose');
const { User } = require('../models/user.model')

module.exports.getAllUsers = async (req, res) => {
  let users = await User.find({});
  return res.send(users);
}