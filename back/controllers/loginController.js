
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const User = require("../models/User");




const createAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET || "my_secret_key",
    { expiresIn: "24h" }
  );
};





const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;


    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin || password !== admin.password)
      return res.status(401).json({
        message: "Invalid email or password",
      });

      //After the admin successfully logs in, create a JWT access token for that admin.
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
  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};




const sendOtp = async (req, res) => {
  try {
    let { phone } = req.body;

   
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role: "STAFF",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();



    //otp store in user
    user.otp = otp;
    user.otpExpiry = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await user.save();

    console.log("OTP:", otp);

    res.json({
      message: "OTP generated successfully",
    });
  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};





const verifyOtp = async (req, res) => {
  try {
    let { phone, otp } = req.body;


    const user = await User.findOne({ phone });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    if (!user.otp)
      return res.status(400).json({
        message: "OTP not found",
      });

    if (new Date() > user.otpExpiry)
      return res.status(400).json({
        message: "OTP expired",
      });

    if (user.otp !== otp)
      return res.status(400).json({
        message: "Invalid OTP",
      });

    // const accessToken = createAccessToken({
    //   _id: user._id,
    //   email: user.email,
    //   phone: user.phone,
    //   role: user.role || "STAFF",
    // });

const accessToken = createAccessToken(user);

    // then the OTP will remain in the user document after successful login.
    user.otp = undefined;
    user.otpExpiry = undefined;

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
  } catch {
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