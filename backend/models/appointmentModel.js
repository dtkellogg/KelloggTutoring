const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
      ref: 'User',
    },
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

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
