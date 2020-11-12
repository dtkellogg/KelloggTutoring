const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const bcrypt = require('bcryptjs')
const path = require('path')
// const appointments = require('./data/appointments')
const reviews = require('./data/reviews')
const connectDB = require('./config/db.js')
const appointmentRoutes = require('./routes/appointmentRoutes')
const appointmentRequestRoutes = require('./routes/appointmentRequestRoutes')
const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const msgRoutes = require('./routes/msgRoutes')
const cors = require("cors")

dotenv.config()

connectDB()

const app = express()

// the following allows you to accept JSON data in the body... when u make a request to db, ur getting back JSON. This allows you to use it in the UI
app.use(express.json())

app.use(cors())

app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/appointmentRequests', appointmentRequestRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/messages', msgRoutes)
app.use('/api/reviews', reviewRoutes)

app.get('/api/config/paypal', (req, res) => 
	res.send(process.env.PAYPAL_CLIENT_ID)
)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve("frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);