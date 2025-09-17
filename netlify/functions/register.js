// netlify/functions/register.js

import nodemailer from "nodemailer";
// netlify/functions/register.js

const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, password } = JSON.parse(event.body);

    // Validation
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: "All fields are required" }),
      };
    }

    // Email transport setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address (set in Netlify env)
        pass: process.env.EMAIL_PASS, // App password (set in Netlify env)
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"SV Realty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to SV Realty",
      text: `Hi ${name},\n\nThanks for registering with SV Realty!\n\nBest Regards,\nSV Realty Team`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Registered! Check your email." }),
    };
  } catch (err) {
    console.error("Error sending email:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Email failed to send.",
        error: err.message,
      }),
    };
  }
};
