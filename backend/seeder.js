const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

const users = require('./data/users')
const appointments = require('./data/appointments')
const reviews = require('./data/reviews')
const Appointment = require('./models/appointmentModel')
const User = require('./models/userModel')
const Review = require('./models/reviewModel')

const connectDB = require('./config/db.js')


dotenv.config()

connectDB()

const importData = async () => {
    try {
        // so data isn't taken from database with data already loaded
       await Appointment.deleteMany()
       await User.deleteMany()
       await Review.deleteMany()

       const createdUsers = await User.insertMany(users)

       const adminUser = createdUsers[0]._id

       const sampleAppointments = appointments.map((appt) => {
           return { ...appt, user: adminUser}
       })

       await Appointment.insertMany(sampleAppointments)

       const sampleReviews = await Review.insertMany(reviews);

       console.log(`Data imported!`.green.inverse)
       process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        // so data isn't taken from database with data already loaded
       await Appointment.deleteMany()
       await User.deleteMany()
       await Review.deleteMany()
   
       console.log(`Data destroyed!`.red.inverse)
       process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}