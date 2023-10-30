const express = require('express');
const userRoutes = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRoutes.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCheck = await userModel.findOne({ email });

    if (userCheck) {
      return res.status(400).send({ msg: 'User Already Signup' });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    return res.status(200).send({ msg: 'User Signup Successfull', user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

userRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCheck = await userModel.findOne({ email });

    const passwordCheck = await bcrypt.compare(password, userCheck.password);

    if (passwordCheck) {
      const token = jwt.sign({ userId: userCheck.id }, process.env.SECRET_KEY);

      return res.status(200).send({ msg: 'User Login Successfull', token });
    } else {
      return res.status(400).send({ msg: 'Incorrect Password' });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = userRoutes;
