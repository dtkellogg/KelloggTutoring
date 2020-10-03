const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");


// @desc    Fetch all appointments
// @router  GET /api/appointments
// @access  Public
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({});
    res.json(appointments);
})

// @desc    Fetch single appointment
// @router  GET /api/appointments/:id
// @access  Public
const getAppointmentById = asyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const appointment = await Appointment.findById(req.params.id);
      if (appointment) {
        res.json(appointment);
      } else {
        res.status(404).json({
          message: "Appointment not found",
        });
      }
    } else {
      res.status(404).json({
        message: "Invalid ID. Appointment not found",
      });
    }
});


module.exports = {
    getAppointments,
    getAppointmentById
}