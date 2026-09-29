const express = require("express");
const router = express.Router();

const {
  getSales,
  getMySales,
} = require("../controllers/sellTableController");

const { authenticateToken } = require("../middleware/authMiddleware");

router.get(
  "/mine",
  authenticateToken,
  getMySales
);

router.get(
  "/",
  authenticateToken,
  getSales
);

module.exports = router;