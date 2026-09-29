
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const Otp = require("../models/otp.model");
// const sendEmail = require("../config/sendEmail");

// const studentSchema = new mongoose.Schema(
//   {
//     username: String,
//     password: String,
//     email: String,
//     googleId: String,
//     avatar: String,
//   },
//   { strict: false }
// );

// const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

// const handleForgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await Student.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "user does not exist",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     await Otp.create({ email, otp });

//     const message = `Your verification code for password reset is ${otp}. It expires in 10 minutes.`;

//     await sendEmail(email, "reset password", message);

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent to your email",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "internal server error",
//     });
//   }
// };

// const handleVerifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const otpRecord = await Otp.findOne({ email, otp }).sort({ created: -1 });

//     if (!otpRecord) {
//       return res.status(400).json({
//         message: "invalid or expired otp",
//       });
//     }

//     const expiry = new Date(otpRecord.created).getTime() + 10 * 60 * 1000;
//     if (Date.now() > expiry) {
//       await Otp.deleteMany({ email });
//       return res.status(400).json({
//         message: "invalid or expired otp",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "otp verified successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "internal server error",
//     });
//   }
// };

// const handleResetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     const otpRecord = await Otp.findOne({ email, otp }).sort({ created: -1 });

//     if (!otpRecord) {
//       return res.status(400).json({
//         message: "invalid or expired otp",
//       });
//     }

//     const expiry = new Date(otpRecord.created).getTime() + 10 * 60 * 1000;
//     if (Date.now() > expiry) {
//       await Otp.deleteMany({ email });
//       return res.status(400).json({
//         message: "invalid or expired otp",
//       });
//     }

//     const user = await Student.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "user does not exist",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashedPassword;
//     await user.save();
//     await Otp.deleteMany({ email });

//     return res.status(200).json({
//       message: "password reset successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "internal server error",
//     });
//   }
// };

// module.exports = {
//   handleForgotPassword,
//   handleVerifyOtp,
//   handleResetPassword,
// };
