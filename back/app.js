const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const loginRouter = require("./router/loginRouter");
const eventRoutes = require("./router/eventRouter");
const sellTableRoutes = require("./router/sellTableRouter");
const ticketRoutes = require("./router/ticketRouter");

const Admin = require("./models/Admin");
const Event = require("./models/Event");

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Routes
app.use("/", loginRouter);

app.use("/v1/on-ground/events", eventRoutes);

app.use("/v1/on-ground/sales", sellTableRoutes);

app.use("/v1/on-ground/tickets", ticketRoutes);

// Test route
app.get("/v1/on-ground/test", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  res.json({
    message: "Authentication successful",
    user: {
      id: req.session.userId,
      phone: req.session.phone,
      email: req.session.email,
      role: req.session.role,
    },
  });
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "On-Ground Sales Backend is running",
  });
});

// Create default admin
async function createAdmin() {
  const admin = await Admin.findOne({
    email: "admin5@gmail.com",
  });

  if (!admin) {
    await Admin.create({
      email: "admin5@gmail.com",
      password: "admin",
      role: "ADMIN",
    });

    console.log("Default admin created");
  }
}

// Create default events
async function seedEvents() {
  const count = await Event.countDocuments();

  if (count === 0) {
    await Event.insertMany([
      {
        name: "Summer Music Fest 2026",
        title: "Summer Music Fest 2026",
        ticketPrice: 500,
        ticketprice: 500,
        coverAmount: 0,
        isActive: true,
      },
      {
        name: "Comedy Night Live",
        title: "Comedy Night Live",
        ticketPrice: 350,
        ticketprice: 350,
        coverAmount: 0,
        isActive: false,
      },
      {
        name: "Tech Conference 2026",
        title: "Tech Conference 2026",
        ticketPrice: 1200,
        ticketprice: 1200,
        coverAmount: 0,
        isActive: false,
      },
    ]);

    console.log("Default events created");
  }
}

// Connect MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ticketapp";

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log("MongoDB connected");

    await createAdmin();
    await seedEvents();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
    console.log("Starting server without a MongoDB connection...");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });