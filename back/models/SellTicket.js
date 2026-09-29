const mongoose = require("mongoose");

const sellTicketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    ticketType: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
    },

    coverAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    buyerName: {
      type: String,
      required: true,
    },

    buyerPhone: {
      type: String,
      required: true,
    },

    buyerEmail: {
      type: String,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "PENDING",
    },

    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingRef: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SellTicket", sellTicketSchema);