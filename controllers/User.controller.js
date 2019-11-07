const mongoose = require('mongoose');
const { User } = require('../models/user.model');

module.exports.getAllUsers = async (req, res) => {
  let users = await User.find({});
  if (!users) {
    return res.status(404).send('No users');
  }
  return res.status(200).send(users);
};
module.exports.getUser = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ObjectId');
  }
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).send('User Not Found');
  }
  return res.status(200).send(user);
};

module.exports.createUser = async (req, res) => {
  let { firstName, lastName, age } = req.body;
  if (age < 0) {
    return res.status(403).send('Age must be greater than 0');
  }
  console.log(firstName, lastName, age, 'this is the age object');
  if (!firstName) {
    return res.status(403).send('First Name is required');
  }
  let user = new User({
    firstName,
    lastName,
    age
  });
  await user
    .save()
    .then(user => {
      res.status(201).send(user);
    })
    .catch(err => {
      res.status(500).send('Unable to save user');
    });
};
module.exports.updateUser = async (req, res) => {
  let { id } = req.params;

  await User.findOneAndUpdate(id, req.body)
    .then(user => {
      res.send(user).status(200);
    })
    .catch(err => {
      res.send('User does not exist').status(404);
    });
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
