const nodemailer = require("nodemailer");

export async function sendMail(subject: string, email: string, body: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `${subject} <${email}>`,
    text: body,
  };

  transporter.sendMail(mailOptions, function (error: string) {
    if (error) {
      throw new Error(error);
    } else {
      return true;
    }
  });
}
