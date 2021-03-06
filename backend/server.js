const fs = require('fs')
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const enforce = require("express-sslify");
const https = require('https')
const colors = require('colors')

// sample data
const appointments = require('./data/appointments')
const reviews = require('./data/reviews')

// database
const connectDB = require('./config/db.js')

// middleware
const cors = require("cors")
const compression = require('compression')

// routes
const appointmentRoutes = require('./routes/appointmentRoutes')
const appointmentRequestRoutes = require('./routes/appointmentRequestRoutes')
const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const msgRoutes = require('./routes/msgRoutes')

dotenv.config()

connectDB()

const app = express()

// the following allows JSON data to be accepted in the body... when u make a request to db, ur getting back JSON. This allows you to use it in the UI
app.use(express.json())


// compress responses
app.use(compression({ threshold: 0 }));

// CORS
app.use(cors())

var corsMiddleware = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'kelloggtutoring.com');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

  next();
}

app.use(corsMiddleware);

// redirect all url requests to https
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/appointmentRequests', appointmentRequestRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/messages', msgRoutes)
app.use('/api/reviews', reviewRoutes)

app.get('/api/config/paypal', (req, res) => 
	res.send(process.env.PAYPAL_CLIENT_ID)
)

// static build files for react side of app
const modifiedPath = __dirname.split('/').slice(0,-1).join('/')

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(modifiedPath, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(modifiedPath, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}


//////////////
// To run in production:
if (process.env.NODE_ENV === "production") {
  const PORT = process.env.PORT || 5000

  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
  );
}

// To run in development:
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 5000;

  const options = {
    key: fs.readFileSync("./server.key", "utf8"),
    cert: fs.readFileSync("./kelloggtutoring_com.crt", "utf8"),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
  });
}
//////////////