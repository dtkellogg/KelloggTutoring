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
    // .get(getTeam)
    .post(
        sendMessageToDb,
        // sendMessageToNodeMailer,
        // response
        )

module.exports = router;
