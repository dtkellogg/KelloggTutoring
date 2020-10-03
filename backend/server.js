const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const bcrypt = require('bcryptjs')
// const appointments = require('./data/appointments')
const connectDB = require('./config/db.js')
const appointmentRoutes = require('./routes/appointmentRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

connectDB()

const app = express()

// the following allows you to accept JSON data in the body... when u make a request to db, ur getting back JSON. This allows you to use it in the UI
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);