const  jwt = require('jsonwebtoken')


////////////////////////////////////////////////////////////////
// Note: The following function takes in the ID because that is what we want to add as the payload.
// Also: The third parameter to .sign is an object of options. The expiresIn is optional, and the '30d
//       means 30 days
 const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = generateToken