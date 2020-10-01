const express = require('express')
const dotenv = require('dotenv')
const appointments = require('./data/appointments')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get("/api/appointments", (req, res) => {
  res.json(appointments)
});

app.get("/api/appointments/:id", (req, res) => {
	const appointment = appointments.find((apt) => apt._id === req.params.id)
  res.json(appointment);
});

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);