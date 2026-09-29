const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token is required",
    });
  }

  try {
    const verifiedUser = jwt.verify(
      token,
      process.env.JWT_SECRET || "my_secret_key"
    );

    req.user = {
      ...verifiedUser,
      id: verifiedUser.userId || verifiedUser.id || verifiedUser._id,
      userId: verifiedUser.userId || verifiedUser.id || verifiedUser._id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};


const authenticateSession = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  req.user = {
    userId: req.session.userId,
    email: req.session.email,
    phone: req.session.phone,
    role: req.session.role,
  };

  next();
};

module.exports = {
  authenticateToken,
  authenticateSession,
};


