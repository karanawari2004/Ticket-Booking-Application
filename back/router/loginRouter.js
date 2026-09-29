const express = require("express");

const {
  adminLogin,
  sendOtp,
  verifyOtp,

  logout,
} = require("../controllers/loginController");

const {
  authenticateSession,
} = require("../middleware/authMiddleware");

const router = express.Router();





router.post(
  "/admin/adminLogin",
  adminLogin
);





router.post(
  "/user/userLogin",
  sendOtp
);





router.post(
  "/user/accesstoken",
  verifyOtp
);






router.get(
  "/user/me",
  authenticateSession,

);

router.post(
  "/user/logout",
  logout
);


module.exports = router;