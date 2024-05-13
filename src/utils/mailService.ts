const nodemailer = require("nodemailer");
require("dotenv").config();

export async function sendMail(subject: string, email: string, body: string) {
  var transporter = nodemailer.createTransport({
    port: 465,
    service: "smtp.gmail.com",
    auth: {
      type: "login",
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
    secure: true,
  });

  await new Promise(async (resolve, reject) => {
    await transporter.verify(function (error: {}, success: {}) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `${subject} <${email}>`,
    text: body,
  };

  return await transporter.sendMail(mailOptions, function (error: {}) {
    if (error) {
      throw new Error(`error: ${error}`);
    } else {
      return true;
    }
  });
}
