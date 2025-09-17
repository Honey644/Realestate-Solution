// netlify/functions/register.js

import nodemailer from "nodemailer";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, password } = JSON.parse(event.body);

  if (!name || !email || !password) {
    return { statusCode: 400, body: JSON.stringify({ msg: "All fields are required" }) };
  }

  // Email setup
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  // Your email
      pass: process.env.EMAIL_PASS   // App password (from Gmail)
    }
  });

  try {
    await transporter.sendMail({
      from: `"SV Realty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to SV Realty",
      text: `Hi ${name},\n\nThanks for registering!`
    });

    return { statusCode: 200, body: JSON.stringify({ msg: "Registered! Check your email." }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ msg: "Email failed to send." }) };
  }
}
