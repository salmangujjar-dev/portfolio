const nodemailer = require("nodemailer");

export async function sendMail(subject: string, email: string, body: string) {
  var transporter = nodemailer.createTransport({
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
    secure: true,
  });

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

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `${subject} <${email}>`,
    text: body,
  };

  await transporter.sendMail(mailOptions, function (error: {}) {
    if (error) {
      throw new Error(`error: ${error}`);
    } else {
      return true;
    }
  });
}
