const express = require("express");

const router = express.Router();

const {
  getEvents,
  getActiveEvent,
  getEventById,
  createEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { authenticateToken } = require("../middleware/authMiddleware");


router.get(
  "/",
  authenticateToken,
  getEvents
);



router.post(
  "/",
  authenticateToken,
  createEvent
);



router.get(
  "/active",
  authenticateToken,
  getActiveEvent
);



router.get(
  "/:id",
  authenticateToken,
  getEventById
);



router.delete(
  "/:id",
  authenticateToken,
  deleteEvent
);


module.exports = router;