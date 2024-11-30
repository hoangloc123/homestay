import express from "express";

import Ticket from "../models/schemas/Ticket.schema.js";
import {
  getUserById,
  getUsers,
  updateUser,
} from "../firebase/firestore/users.firestore.js";

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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id || !updates) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id: _, ...userWithoutId } = user;

    await updateUser(id, { ...userWithoutId, ...updates });

    res.status(200).json({ message: "User information updated successfully." });
  } catch (error) {
    console.error("Error updating user information:", error);
    res
      .status(500)
      .json({
        message: "Failed to update user information.",
        error: error.message,
      });
  }
});

router.get("/", async (req, res) => {
  const { role = "", page = 1, pageSize = 10 } = req.query;

  try {
    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);

    if (
      isNaN(parsedPage) ||
      isNaN(parsedPageSize) ||
      parsedPage <= 0 ||
      parsedPageSize <= 0
    ) {
      return res.status(400).json({ message: "Invalid page or pageSize" });
    }

    const { users, total } = await getUsers(role, parsedPage, parsedPageSize);

    const totalPages = Math.ceil(total / parsedPageSize);

    res.status(200).json({
      users,
      pagination: {
        total,
        pages: totalPages,
        pageSize: parsedPageSize,
        current: parsedPage,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
});

export default router;
