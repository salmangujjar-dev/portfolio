import { cache } from "react";
const nodemailer = require("nodemailer");

// Cache transporter creation per request to avoid recreating it
const getTransporter = cache(() => {
  return nodemailer.createTransport({
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
    secure: true,
  });
});

export async function sendMail(subject: string, email: string, body: string) {
  const transporter = getTransporter();

  await new Promise((resolve, reject) => {
    transporter.verify(function (error: {}, success: {}) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `${subject} <${email}>`,
    text: body,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    throw error;
  }
}
