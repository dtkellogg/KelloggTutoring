const express = require("express");
const router = express.Router();
const {
    sendMessageToDb,
    sendMessageToNodeMailer,
    response
} = require("../controllers/msgController");

console.log("In the router")

router
    .route("/")
    .post(sendMessageToDb, sendMessageToNodeMailer)

module.exports = router;
