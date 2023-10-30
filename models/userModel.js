const mongoose = require('mongoose');

const users = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model('users', users);

module.exports = userModel;
