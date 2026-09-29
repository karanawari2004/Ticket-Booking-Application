const SellTicket = require("../models/SellTicket");

const getSales = async (req, res) => {
  try {

    // Get all sales
    const sales = await SellTicket.find()
      .populate("eventId", "name title")
      .sort({ createdAt: -1 });

    // Calculate total sales
    let totalSales = 0;


    // suppose sale.totalamount that mens each sels amount it is 500 then add this in  let totalSales = 0; 
    sales.forEach((sale) => {
      const amount = Number(sale.totalAmount);

      if (Number.isFinite(amount)) {
        totalSales += amount;
      }
    });

  
    res.status(200).json({
      sales,
      totalSales,
    });

  } catch (error) {
    console.log("Get sales error:", error.message);

    res.status(500).json({
      message: "Failed to get sales",
    });
  }
};


const getMySales = async (req, res) => {
  try {

    // Get only logged-in user's sales
    const sales = await SellTicket.find({
      soldBy: req.user.id,
    })
      .populate("eventId", "name title")
      .sort({ createdAt: -1 });

    res.status(200).json(sales);

  } catch (error) {
    console.log("Get my sales error:", error.message);

    res.status(500).json({
      message: "Failed to get your sales",
    });
  }
};


module.exports = {
  getSales,
  getMySales,
};