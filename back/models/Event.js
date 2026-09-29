const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		name: String,
		title: String,
		ticketPrice: Number,
		ticketprice: Number,
		coverAmount: Number,
		prcode: String,
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		strict: false,
	}
);

module.exports = mongoose.model("Event", eventSchema);
