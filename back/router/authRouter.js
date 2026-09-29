// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const {
//   handleForgotPassword,
//   handleVerifyOtp,
//   handleResetPassword,
// } = require("../controllers/auth.controler");

// const router = express.Router();

// //  redirect to GOOGLE LOGIN
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     //scope ha google kadun kay ghych
//     scope: ["profile", "email"],
//   })
// );

// // GOOGLE CALLBACK
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false,
//   }),
//   (req, res) => {
//     try {
//       const token = jwt.sign(
//         {
//           id: req.user._id,
//           email: req.user.email,
//           name: req.user.username || req.user.name || "Google User",
//           avatar: req.user.avatar || null,
//         },
//         process.env.SECRET_KEY,
//         {
//           expiresIn: "7d",
//         }
//       );

//       res.redirect(
//         `${process.env.CLIENT_URL}/auth-success?token=${token}`
//       );
//     } catch (error) {
//       console.log("Google login error:", error);

//       res.redirect(
//         `${process.env.CLIENT_URL}/?error=google_failed`
//       );
//     }
//   }
// );

// // CHECK AUTHENTICATION
// router.get("/me", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.SECRET_KEY
//     );

//     res.json({
//       message: "Authentication Successful",
//       user: decoded,
//     });
//   } catch (error) {
//     res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// });

// router.post("/forgot-password", handleForgotPassword);
// router.post("/verify-otp", handleVerifyOtp);
// router.post("/reset-password", handleResetPassword);

// module.exports = router;