const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
      ref: 'User',
    },
    subject: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
		},
		// paidDate: {
		// 	type: Date
		// },
    duration: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
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

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
