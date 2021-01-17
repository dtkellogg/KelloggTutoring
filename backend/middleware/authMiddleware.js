const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    console.log(req)

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            /////////
            // At the end of the following, -password means that the password isn't returned

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('You are not authorized. Token failed.')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized. No token.')
    }

})

const admin = (req, res, next) => {
    // Note: if there is a user (req.user) and if isAdmin is true
    if(req.user && req.user.isAdmin) {
        next()

    } else {
        res.status(401)
        throw new Error('Not authorized as an admin.')
    }
}

module.exports = { protect, admin }