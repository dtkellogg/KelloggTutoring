const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        paymentItems: [
            {
                appointment: { type: String, required: true },
                student: { type: String, required: true },
                subject: { type: String, required: true },
                date: { type: Date, required: true },
                appointment: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Appointment',
                },
            },
        ],

        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
