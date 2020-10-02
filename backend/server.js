const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
// const appointments = require('./data/appointments')
const connectDB = require('./config/db.js')
const appointmentsRoutes = require('./routes/appointmentsRoutes')

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/appointments', appointmentsRoutes)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);