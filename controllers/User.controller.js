const mongoose = require('mongoose');
const { User } = require('../models/user.model')

module.exports.getAllUsers = async (req, res) => {
  let users = await User.find({});
  return res.send(users);
}
module.exports.getUser = async (req, res) => {
  let id = req.params.id;
  console.log(req.params);
  let user = await User.find({
    '__id': id,
  });
  return res.send(user);
}