// const Event = require("../models/Event");

// const DEFAULT_EVENTS = [
//   {
//     name: "Summer Music Fest 2026",
//     title: "Summer Music Fest 2026",
//     ticketPrice: 500,
//     ticketprice: 500,
//     coverAmount: 0,
//     isActive: true,
//   },
//   {
//     name: "Comedy Night Live",
//     title: "Comedy Night Live",
//     ticketPrice: 350,
//     ticketprice: 350,
//     coverAmount: 0,
//     isActive: false,
//   },
//   {
//     name: "Tech Conference 2026",
//     title: "Tech Conference 2026",
//     ticketPrice: 1200,
//     ticketprice: 1200,
//     coverAmount: 0,
//     isActive: false,
//   },
// ];

// async function seedDatabase() {
//   const eventCount = await Event.countDocuments();

//   if (eventCount === 0) {
//     await Event.insertMany(DEFAULT_EVENTS);
//     console.log("Seeded demo events for on-ground sales");
//     return;
//   }

//   const activeEvent = await Event.findOne({ isActive: true });

//   if (!activeEvent) {
//     const firstEvent = await Event.findOne().sort({ createdAt: 1 });

//     if (firstEvent) {
//       firstEvent.isActive = true;
//       await firstEvent.save();
//     }
//   }
// }

// module.exports = seedDatabase;
