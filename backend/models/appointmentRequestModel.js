const mongoose = require("mongoose");

const appointmentRequestSchema = mongoose.Schema(
	{
		student: {
				type: String,
				required: true,
		},
		subject: {
				type: String,
				required: true,
		},
		date: {
				type: Date,
				required: true,
		},
		startTime: {
				type: mongoose.Schema.Types.Mixed,
				required: true,
		},
		endTime: {
				type: mongoose.Schema.Types.Mixed,
				required: true,
		},
		paid: {
				type: Boolean,
				default: false
		}
	},
	{
		timestamps: true,
	}
);

const AppointmentRequest = mongoose.model("AppointmentRequest", appointmentRequestSchema);

module.exports = AppointmentRequest;
