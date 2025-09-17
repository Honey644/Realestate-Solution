import nodemailer from "nodemailer";

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);
    const { name, email } = data;

    // Setup transporter (example: Gmail SMTP)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,  // set in Netlify env variables
        pass: process.env.MAIL_PASS
      }
    });

    // Send confirmation mail
    await transporter.sendMail({
      from: `"SV Realty" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Welcome to SV Realty Solutions!",
      text: `Hello ${name},\n\nYour account has been created successfully.`,
      html: `<p>Hello <b>${name}</b>,</p><p>Your account has been created successfully.</p>`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mail sent successfully" })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
