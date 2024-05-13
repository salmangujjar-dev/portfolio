const nodemailer = require("nodemailer");
require("dotenv").config();

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
  // console.log(`wowowopre: ${process.env.NODEMAILER_EMAIL}`);

  // console.log(`wowowopost: ${process.env.NODEMAILER_EMAIL}`);

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `${subject} <${email}>`,
    text: body,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log({ res });
    return res;
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    throw error;
  }
}
