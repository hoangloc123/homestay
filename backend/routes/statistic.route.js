import express from "express";
import moment from "moment";

import Ticket from "../models/schemas/Ticket.schema.js";

// Helper method
function genMonthlyAggregatePipeline(startOfMonth, endOfMonth, ownerId) {
  const queryConditions = {
    fromDate: { $gte: startOfMonth, $lte: endOfMonth },
    isConfirmed: true,
    isPaid: true,
    isCanceled: false,
  };

  const aggregatePipeline = [
    { $match: queryConditions },
    {
      $lookup: {
        from: "accommodations",
        localField: "accommodation",
        foreignField: "_id",
        as: "accommodation",
      },
    },
    { $unwind: "$accommodation" },
  ];

  if (ownerId) {
    aggregatePipeline.push({
      $match: {
        "accommodation.ownerId": ownerId,
      },
    });
  }

  return aggregatePipeline;
}

const router = express.Router();

router.get("/booking-summary", async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

    const tickets = await Ticket.find({
      fromDate: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalBooking = tickets.length;

    const successBooking = tickets.filter(
      (ticket) => ticket.isConfirmed && !ticket.isCanceled,
    ).length;

    const totalRevenue = tickets
      .filter(
        (ticket) => ticket.isConfirmed && !ticket.isCanceled && ticket.isPaid,
      )
      .reduce((sum, ticket) => sum + ticket.totalPrice, 0);

    res.status(200).json({
      totalBooking,
      successBooking,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching ticket summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/monthly-revenue", async (req, res) => {
  try {
    const { ownerId } = req.query;
    const currentYear = moment().year();
    const monthlyRevenue = [];

    for (let month = 0; month < 12; month++) {
      const startOfMonth = moment({ year: currentYear, month })
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment({ year: currentYear, month })
        .endOf("month")
        .format("YYYY-MM-DD");

      const aggregatePipeline = genMonthlyAggregatePipeline(
        startOfMonth,
        endOfMonth,
        ownerId,
      );

      const tickets = await Ticket.aggregate(aggregatePipeline);

      const totalRevenue = tickets.reduce(
        (sum, ticket) => sum + ticket.totalPrice,
        0,
      );

      monthlyRevenue.push({ month: month + 1, totalRevenue });
    }

    res.status(200).json({ monthlyRevenue });
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/monthly-booking", async (req, res) => {
  try {
    const { ownerId } = req.query;
    const currentYear = moment().year();
    const monthlyBooking = [];

    for (let month = 0; month < 12; month++) {
      const startOfMonth = moment({ year: currentYear, month })
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment({ year: currentYear, month })
        .endOf("month")
        .format("YYYY-MM-DD");

      const aggregatePipeline = genMonthlyAggregatePipeline(
        startOfMonth,
        endOfMonth,
        ownerId,
      );

      const ticketCount = await Ticket.aggregate(aggregatePipeline);

      monthlyBooking.push({
        month: month + 1,
        ticketCount: ticketCount.length,
      });
    }

    res.status(200).json({ monthlyBooking });
  } catch (error) {
    console.error("Error fetching monthly booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/trending-destination", async (req, res) => {
  try {
    const trendingCities = await Ticket.aggregate([
      {
        $lookup: {
          from: "accommodations",
          localField: "accommodation",
          foreignField: "_id",
          as: "accommodation",
        },
      },
      { $unwind: "$accommodation" },
      {
        $group: {
          _id: "$accommodation.city",
          ticketCount: { $sum: 1 },
        },
      },
      { $sort: { ticketCount: -1 } },
      { $limit: 5 },
      {
        $project: {
          city: "$_id",
          ticketCount: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({ trendingCities });
  } catch (error) {
    console.error("Error fetching trending destinations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
