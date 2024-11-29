import express from "express";

import Ticket from "../models/schemas/Ticket.schema.js";
import { getUserById } from "../firebase/firestore/users.firestore.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id/tickets", async (req, res) => {
  try {
    const { id } = req.params;

    const tickets = await Ticket.find({ userId: id }).populate({
      path: "accommodation",
      select: "name city address",
    });

    if (!tickets || tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this user" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error retrieving tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
