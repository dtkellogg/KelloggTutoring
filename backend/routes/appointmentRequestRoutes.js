const express = require("express");
const router = express.Router();
const { getAppointmentRequests, getAppointmentRequestById, deleteAppointmentRequests, createAppointmentRequest, updateAppointmentRequests } = require("../controllers/appointmentRequestController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route('/')
    .get(getAppointmentRequests)
    .post(createAppointmentRequest)
router.route("/:id")
    .get(getAppointmentRequestById)
    // .delete(protect, admin, deleteAppointmentRequests)
    // .put(protect, admin, updateAppointmentRequests)

module.exports = router