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

// @desc    Delete a appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)

  if (appointment) {
    await appointment.remove()
    res.json({ message: 'Appointment removed' })
  } else {
    res.status(404)
    throw new Error('Appointment not found')
  }
})

// @desc    Create a appointment
// @route   POST /api/appointments
// @access  Private/Admin
const createAppointment = asyncHandler(async (req, res) => {
  const { subject, student, date, duration, time } = req.body

  console.log(`req.body: ${req.body.subject}`)

  const appointment = await Appointment.create({
    user: req.user._id,
    subject,
    student,
    date, 
    duration, 
    time, 
  })

  if (appointment) {
    res.status(201).json({
      _id: appointment._id,
      user: req.user_id,
      subject: appointment.subject,
      student: appointment.student,
      date: appointment.date,
      duration: appointment.duration,
      time: appointment.time,
      paid: appointment.paid,
    });
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
  // const appointment = new Appointment({
  //   user: req.user,
  //   subject: 'SAT',
  //   student: 'Akira',
  //   date: '10-10-2020',
  //   duration: 1,
  //   time: '11:00 - 12:00 PM',
  // })

  // const createdAppointment = await appointment.save()
  // res.status(201).json(createdAppointment)
})

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointment = asyncHandler(async (req, res) => {
  const {
    user,
    subject,
    student,
    date,
    duration,
    time,
    paid,
  } = req.body

  const appointment = await Appointment.findById(req.params.id)

  if (appointment) {
    appointment.user = user
    appointment.subject = subject
    appointment.student = student
    appointment.date = date
    appointment.duration = duration
    appointment.time = time
    appointment.paid = paid

    const updatedAppointment = await appointment.save()
    res.json(updatedAppointment)
  } else {
    res.status(404)
    throw new Error('Appointment not found')
  }
})

module.exports = {
    getAppointments,
    getAppointmentById,
    deleteAppointment,
    createAppointment,
    updateAppointment
}