const Event = require("../models/Event");
const SellTicket = require("../models/SellTicket");

const createSale = async (req, res, paymentMethod) => {
  try {
    console.log("FRONTEND DATA");
    console.log(req.body);
    console.log("Payment Method:", paymentMethod);
    console.log("Logged In User:", req.user);
    

    const {
      eventid,
      tickettypeid,
      noofticket,
      buyername,
      buyerphone,
      buyeremail,
    } = req.body;

    const soldBy = req.user?.id || req.user?.userId || req.user?._id;

    if (!soldBy) {
      return res.status(401).json({
        message: "Authenticated user is required",
      });
    }

    if (!eventid || !tickettypeid || !noofticket || !buyername || !buyerphone) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const event = await Event.findById(eventid);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const quantity = Number(noofticket);


    // if we have to get only value const ticketPrice = Number(event.ticketPrice);

    const ticketPrice = Number(
      event.ticketPrice ?? event.ticketprice ?? 0
    );
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a positive whole number",
      });
    }
                                           
    if (!Number.isFinite(ticketPrice) || ticketPrice < 0) {
      return res.status(400).json({
        message: "Event ticket price is invalid",
      });
    }

    const totalAmount = ticketPrice * quantity;

    const bookingRef = "BOOK-" + Date.now();

    const sale = await SellTicket.create({
      eventId: event._id,
      ticketType: tickettypeid,
      quantity: quantity,
      ticketPrice: ticketPrice,
      totalAmount: totalAmount,
      buyerName: buyername,
      buyerPhone: buyerphone,
      buyerEmail: buyeremail,
      paymentMethod: paymentMethod,
      paymentStatus:
        paymentMethod === "CASH" ? "PAID" : "PENDING",
      soldBy: soldBy,
      bookingRef: bookingRef,
    });

    console.log(sale);
    console.log("Event ID:", eventid);
    console.log("Ticket Type:", tickettypeid);
    console.log("Quantity:", quantity);
    console.log("Buyer Name:", buyername);
    console.log("Buyer Phone:", buyerphone);
    console.log("Buyer Email:", buyeremail);
    console.log("Ticket Price:", ticketPrice);
    console.log("Total Amount:", totalAmount);
    console.log("Payment Method:", paymentMethod);
    console.log("Booking Ref:", bookingRef);
    

    return res.status(201).json({
      message: "Ticket sold successfully",
      data: {
        orderstatus:
          paymentMethod === "CASH"
            ? "PAID"
            : "PENDING",
        bookingref: bookingRef,
        saleId: sale._id,
        eventName: event.name || event.title,
        ticketPrice: ticketPrice,
        quantity: quantity,
        totalAmount: totalAmount,
      },
    });
  } catch (error) {
    console.log("Create sale error:", error.message);

    return res.status(500).json({
      message: "Failed to create ticket sale",
    });
  }
};

const sellCash = async (req, res) => {
  return createSale(req, res, "CASH");
};

const sellPaymentLink = async (req, res) => {
  return createSale(req, res, "PAYMENT_LINK");
};

module.exports = {
  sellCash,
  sellPaymentLink,
};