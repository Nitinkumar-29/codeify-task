const nodemailer = require("nodemailer");
require("dotenv").config();

// create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false,
});

// function to send email
async function sendEmail(to, subject, text, html) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
