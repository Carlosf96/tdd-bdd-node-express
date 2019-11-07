const mongoose = require('mongoose');
const { User } = require('../models/user.model');

module.exports.getAllUsers = async (req, res) => {
  let users = await User.find({});
  if (!users) {
    return res.send('No users').status(404);
  }
  return res.send(users).status(200);
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
  if (age < 0) {
    return res.send('Age must be greater than 0').status(403)
  }
  console.log(age,'this is the age object');
  if (!firstName) {
    return res.send('First Name is required').status(403)
  }
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
