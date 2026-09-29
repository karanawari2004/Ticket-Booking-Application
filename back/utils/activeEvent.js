const Event = require("../models/Event");

async function findActiveEvent() {
	let event = await Event.findOne({ isActive: true }).sort({ updatedAt: -1 });

	if (!event) {
		event = await Event.findOne().sort({ createdAt: -1 });
	}

	return event;
}

module.exports = { findActiveEvent };
