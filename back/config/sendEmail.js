// const nodemailer = require("nodemailer");

// const sendEmail = async (email, subject, message) => {
//   if (!process.env.MY_EMAIL || !process.env.EMAIL_PASSWORD) {
//     console.log(`Email not configured. OTP for ${email}: ${message}`);
//     return;
//   }

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.MY_EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.MY_EMAIL,
//     to: email,
//     subject,
//     text: message,
//   });
// };

// module.exports = sendEmail;