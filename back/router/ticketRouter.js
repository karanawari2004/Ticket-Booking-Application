const express = require("express");

const router = express.Router();

const {
  sellCash,
  sellPaymentLink,
} = require("../controllers/ticketController");

const { authenticateToken } = require("../middleware/authMiddleware");

router.post(
  "/cash",
  authenticateToken,
  sellCash
);

router.post(
  "/payment-link",
  authenticateToken,
  sellPaymentLink
);

module.exports = router;