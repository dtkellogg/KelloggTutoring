const express = require("express");
const router = express.Router();
const { getAppointments, getAppointmentById } = require("../controllers/appointmentController")

router.route('/').get(getAppointments)
router.route("/:id").get(getAppointmentById)

module.exports = router