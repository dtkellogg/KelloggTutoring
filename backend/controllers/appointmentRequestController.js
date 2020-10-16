const asyncHandler = require("express-async-handler");
// const Appointment = require("../models/appointmentModel");
const AppointmentRequest = require("../models/appointmentRequestModel");
const mongoose = require("mongoose");


// @desc    Fetch all appointments
// @router  GET /api/appointmentRequests
// @access  Public
const getAppointmentRequests = asyncHandler(async (req, res) => {
    const appointmentRequests = await AppointmentRequest.find({});
    res.json(appointmentRequests);
})

// @desc    Fetch single appointment
// @router  GET /api/appointmentRequests/:id
// @access  Public
const getAppointmentRequestById = asyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const appointmentRequest = await AppointmentRequest.findById(req.params.id);
        if (appointmentRequest) {
            res.json(appointmentRequest);
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
// @route   DELETE /api/appointmentRequests/:id
// @access  Private/Admin
const deleteAppointmentRequest = asyncHandler(async (req, res) => {
    const appointmentRequest = await AppointmentRequest.findById(req.params.id)

    if (appointmentRequest) {
        await appointmentRequest.remove()
        res.json({ message: 'Appointment removed' })
    } else {
        res.status(404)
        throw new Error('Appointment not found')
    }
})

// @desc    Create an appointment request
// @route   POST /api/appointmentRequests
// @access  Private/Admin
const createAppointmentRequest = asyncHandler(async (req, res) => {
    const { student, subject, date, startTime, endTime } = req.body

    console.log(`req.body: ${req.body.subject}`)

    const appointmentRequest = await AppointmentRequest.create({
        student,
        subject,
        date,
        startTime,
        endTime,
    })

    console.log(`APPOITNEMNTREQUEST: ${appointmentRequest}`)

    if (appointmentRequest) {
        res.status(201).json({
            _id: appointmentRequest._id,
            user: req.user_id,
            student: appointmentRequest.student,
            subject: appointmentRequest.subject,
            date: appointmentRequest.date,
            startTime: appointmentRequest.startTime,
            endTime: appointmentRequest.endTime,
            paid: appointmentRequest.paid,
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

module.exports = {
    getAppointmentRequests,
    getAppointmentRequestById,
    deleteAppointmentRequest,
    createAppointmentRequest,
}