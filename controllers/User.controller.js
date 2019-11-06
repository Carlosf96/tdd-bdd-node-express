const mongoose = require('mongoose');
const { User } = require('../models/user.model');

module.exports.getAllUsers = async (req, res) => {
  let users = await User.find({});
  return res.send(users);
};
module.exports.getUser = async (req, res) => {
  let id = req.params.id;
  console.log(req.params);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ObjectId');
  }
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).send('User Not Found');
  }
  return res.send(user);
};
