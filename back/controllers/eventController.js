const Event = require("../models/Event");
const { findActiveEvent } = require("../utils/activeEvent");



const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      events: events,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};



const getActiveEvent = async (req, res) => {
  try {
    const event = await findActiveEvent();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "No active event found",
      });
    }

    res.status(200).json({
      success: true,
      event: event,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch active event",
    });
  }
};



const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event: event,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};


const createEvent = async (req, res) => {
  try {
    const {
      name,
      title,
      ticketPrice,
      isActive,
    } = req.body;

    if (
      !name ||
      !title ||
      ticketPrice === undefined ||
      ticketPrice === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, title, and ticket price are required",
      });
    }

    const event = await Event.create({
      name,
      title,
      ticketPrice: Number(ticketPrice),
      ticketprice: Number(ticketPrice),
      isActive: Boolean(isActive),
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create event",
    });
  }
};



const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete event",
    });
  }
};


module.exports = {
  getEvents,
  getActiveEvent,
  getEventById,
  createEvent,
  deleteEvent,
};