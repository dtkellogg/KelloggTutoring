const express = require("express");
const asyncHandler = require("express-async-handler")
const router = express.Router();
const Appointment = require("../models/appointmentModel")
const mongoose = require('mongoose')

// @desc    Fetch all appointments
// @router  GET /api/appointments
// @access  Public
router.get("/", asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
  res.json(appointments);
}));

// @desc    Fetch single appointment
// @router  GET /api/appointments/:id
// @access  Public
// router.get("/:id", asyncHandler(async (req, res) => {
//   // const appointment = appointments.find((apt) => apt._id === req.params.id);
//   const appointment = await Appointments.findById(req.params.id)

//   if (appointment) {
//   res.json(appointment)
//   } else {
//     rs.status(404).json({ message: 'Appointment not found'})
//   }
// }));

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
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
  })
);

module.exports = router