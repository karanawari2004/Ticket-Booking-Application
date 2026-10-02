const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const User = require("../models/User");
const sendOTP = require("../config/twilio");

const normalizeIndianPhone = (value) => {
  if (value === undefined || value === null) return null;

  const phone = String(value).trim().replace(/[\s()-]/g, "");

  if (/^[6-9]\d{9}$/.test(phone)) {
    return `+91${phone}`;
  }

  if (/^\+91[6-9]\d{9}$/.test(phone)) {
    return phone;
  }

  return null;
};

const createAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET || "my_secret_key",
    {
      expiresIn: "24h",
    }
  );
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin || password !== admin.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = createAccessToken(admin);

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role || "ADMIN",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    const phone = normalizeIndianPhone(req.body.phone);

    if (!phone) {
      return res.status(400).json({
        message: "Enter a valid Indian 10-digit phone number",
      });
    }

    console.info(
      "Sending OTP to phone ending in",
      phone.slice(-4)
    );

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role: "STAFF",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save OTP
    user.otp = otp;

    user.otpExpiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await user.save();

    // Show OTP in development only
    if (process.env.NODE_ENV !== "production") {
      console.info("[OTP] Development code:", otp);
    }

    // Send OTP through Twilio
    await sendOTP(phone, otp);

    console.log("OTP sent successfully");

    res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP error:", error);

    res.status(500).json({
      message: error.message || "Failed to send OTP",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const phone = normalizeIndianPhone(req.body.phone);
    let { otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        message:
          "A valid Indian phone number and OTP are required",
      });
    }

    otp = otp.toString().trim();

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.otp) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    if (!user.otpExpiresAt) {
      return res.status(400).json({
        message: "OTP expiry not found",
      });
    }

    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    /*
     * STAFF LOGIN:
     *
     * 1. Normal OTP received by SMS works.
     * 2. 461933 also works during development/testing.
     */
    const isNormalOtpValid = user.otp === otp;

    const isDevelopmentOtpValid =
      process.env.NODE_ENV !== "production" &&
      otp === "461933";

    if (!isNormalOtpValid && !isDevelopmentOtpValid) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    console.log(
      isDevelopmentOtpValid && !isNormalOtpValid
        ? "Development OTP 461933 used for staff login"
        : "SMS OTP verified successfully"
    );

    // Create JWT after successful OTP verification
    const accessToken = createAccessToken(user);

    // Remove OTP after successful login
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role || "STAFF",
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const logout = (req, res) => {
  res.json({
    message: "Logout successful",
  });
};

module.exports = {
  adminLogin,
  sendOtp,
  verifyOtp,
  logout,
};