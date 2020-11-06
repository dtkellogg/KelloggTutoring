const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        // unique: true,
        required: [true, "Please add a message"],
    },
    name: {
        type: String,
        // required: [true, "Please add a store ID"],
        trim: true,
        unique: false,
        maxlength: [20, "Name must be less than 20 chars"],
    },
    email: {
        type: String,
        required: [true, "Please add an email address"],
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
        required: [true, "Please add a subject"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Message", MessageSchema);