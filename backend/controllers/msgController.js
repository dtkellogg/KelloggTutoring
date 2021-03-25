const nodemailer = require("nodemailer");
const request = require("request");

// Environment variables
const emailFrom = process.env.NODEMAILER_FROM_EMAIL;
const emailTo = process.env.NODEMAILER_TO_EMAIL;
const password = process.env.NODEMAILER_EMAIL_PASSWORD;
const host = process.env.NODEMAILER_HOST



// Model
const Message = require("../models/msgModel");

// @desc  Create a message
// @route POST /api/messages
// @access Public
exports.sendMessageToDb = async (req, res, next) => {
    try {
        // req.body gives the object that was sent for the post request
        const message = await Message.create(req.body);

        res.status(201).json({
            success: true,
            data: message,
        })

        next();
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: "Please send a new message." });
        }
        res.status(500).json({ error: "Server error" });
    }
};

exports.sendMessageToNodeMailer = async (req, res, next) => {
    console.log(`in node mailer`)
    // console.log(req)
    // console.log(`emailFrom: ${emailFrom}`)
    // console.log(`process.env.NODEMAILER_FROM_EMAIL: ${process.env.NODEMAILER_FROM_EMAIL}`)
    try {

        console.log("Inside the nodemail server.js post request");

        const output = `
            <p>You have a new message from Kelloggtutoring.com</p>
            <h3>Contact Details</h3>
            <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
            <li>Subject: ${req.body.subject}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `;

        

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            service: "Gmail",
            port: 587,
            // secure: true, // true for 465, false for other ports
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_FROM_EMAIL, // generated ethereal user
                pass: process.env.NODEMAILER_EMAIL_PASSWORD, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        
        // send mail with defined transport object
        const mailOptions = {
            from: `"Nodemailer Contact" <${process.env.NODEMAILER_FROM_EMAIL}>`, // sender address
            to: `${process.env.NODEMAILER_TO_EMAIL}`, // list of receivers
            subject: "Tutoring Request", // Subject line
            text: "Hello!", // plain text body
            html: output, // html body
            uri: "https://kelloggtutoring.com"
        };
        
        // console.log(output)
        // console.log(transporter)
        // console.log(mailOptions)

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                    console.log(`errNodeMailer: ${error}`)
            } else {
                console.log(`Message sent: %s`, info.messageId)
                console.log(`Preview URL: %s`, nodemailer.gettestMessageUrl(info))
            }
            // request(mailOptions, (err, response, body) => {
            //     if (err) {
            //         // res.redirect("/components/404");
            //         console.log(`errNodeMailer: ${err}`)
            //     } else {
            //         console.log(response.data)
            //         if (response.statusCode === 200) {
            //         } else {
            //             res.redirect("/");
            //         }
            //     }
            // });

        },
        console.log("Made it through both message middleware"))
        next()
    } catch (err) {
        console.log(err)
    }
};

exports.response = async (req, res, next) => {
    try {
        console.log('Complete. In third middleware')

        res.status(201).json({
            success: true,
            data: false,
        })
    }
    catch (err) {
        console.log(err)
    }
}