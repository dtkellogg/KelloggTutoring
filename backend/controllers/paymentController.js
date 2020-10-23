const asyncHandler = require('express-async-handler')
const Payment = require('../models/paymentModel.js')

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private
const addPaymentItems = asyncHandler(async (req, res) => {
    const {
        paymentItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
    } = req.body

    if (paymentItems && paymentItems.length === 0) {
        res.status(400)
        throw new Error('No payment items')
        return
    } else {
        const payment = new Payment({
            paymentItems,
            user: req.user._id,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
        })

        const createdPayment = await payment.save()

        res.status(201).json(createdPayment)
    }
})

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id).populate(
        'user', // from user
        'name email' // this gives us the name and email
    )

    if (payment) {
        res.json(payment)
    } else {
        res.status(404)
        throw new Error('Payment not found')
    }
})

// @desc    Update payment to paid
// @route   GET /api/payments/:id/pay
// @access  Private
const updatePaymentToPaid = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id)

    if (payment) {
        payment.isPaid = true
        payment.paidAt = Date.now()
        payment.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedPayment = await Payment.save()

        res.json(updatedPayment)
    } else {
        res.status(404)
        throw new Error('Payment not found')
    }
})

// @desc    Get logged in user payments
// @route   GET /api/payments/mypaymentss
// @access  Private
const getMyPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ user: req.user._id })
    res.json(payments)
})

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
const getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({}).populate('user', 'id name')
    res.json(payments)
})

module.exports = {
    addPaymentItems,
    getPaymentById,
    updatePaymentToPaid,
    getMyPayments,
    getPayments,
}