const express = require('express');
const appointmentRoutes = express.Router();
const appointmentModel = require('../models/appointmentModel');

appointmentRoutes.post('/bookappointment', async (req, res) => {
  try {
    const appointment = await appointmentModel.create({
      ...req.body,
    });

    return res
      .status(200)
      .send({ msg: 'Appointment Booked Successfull', appointment });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

appointmentRoutes.get('/getappointments', async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    return res.status(200).send(appointments);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = appointmentRoutes;
