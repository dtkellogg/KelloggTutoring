const express = require('express')
const router = express.Router()
const {
    addPaymentItems,
    getPaymentById,
    updatePaymentToPaid,
    getMyPayments,
    getPayments,
} = require('../controllers/paymentController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(protect, addPaymentItems).get(protect, admin, getPayments)
router.route('/mypayments').get(protect, getMyPayments)
router.route('/:id').get(protect, getPaymentById)
router.route('/:id/pay').put(protect, updatePaymentToPaid)

module.exports = router