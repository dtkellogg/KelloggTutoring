const express = require("express");
const router = express.Router();
const { getAppointments, getAppointmentById, deleteAppointment, createAppointment, updateAppointment } = require("../controllers/appointmentController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route('/').get(getAppointments).post(protect, admin, createAppointment)
router.route("/:id").get(getAppointmentById).delete(protect, admin, deleteAppointment).put(protect, admin, updateAppointment)

module.exports = router