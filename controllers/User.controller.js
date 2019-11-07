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

module.exports.createUser = async (req, res) => {
  let { firstName, lastName, age } = req.body;
  let user = new User({
    firstName,
    lastName,
    age
  });
  await user.save();
  return res.send(user);
};
module.exports.updateUser = async (req, res) => {
  let { id } = req.params;

  let user = await User.findOneAndUpdate(id, req.body, { new: true} );
  if (!user) {
    res.send('User not found').status(404);
  }
  res.send(user);
};

module.exports.deleteUser = async (req, res) => {
  let { id } = req.params;
  await User.findOneAndDelete({ _id: id })
    .then(() => {
      res.send('User Deleted').status(200);
      console.log('User deleted');
    })
    .catch(err => {
      res.send('User not found').satus(404);
      console.log(err, 'User not found');
    });
};
