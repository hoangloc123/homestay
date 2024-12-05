import express from "express";

import Ticket from "../models/schemas/Ticket.schema.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../firebase/firestore/users.firestore.js";
import { Role } from "../constants/role.constant.js";

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
    const { page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const tickets = await Ticket.find({ userId: id })
      .populate({
        path: "accommodation",
        select: "name city address",
      })
      .sort({ fromDate: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalTickets = await Ticket.countDocuments({ userId: id });

    res.status(200).json({
      tickets,
      pagination: {
        total: totalTickets,
        pages: Math.ceil(totalTickets / limitNumber),
        pageSize: limitNumber,
        current: pageNumber,
      },
    });
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
    res.status(500).json({
      message: "Failed to update user information.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  const { role = "", bossId = "", page = 1, pageSize = 10 } = req.query;

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

    const { users, total } = await getUsers(
      role,
      bossId,
      parsedPage,
      parsedPageSize,
    );

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

/**
 * Route to delete a user by ID, only if currentUserId has 'admin' or 'host' role.
 * @param {string} currentUserId - ID of the current user who is attempting the delete.
 * @param {string} deleteId - ID of the user to be deleted.
 */
/**
 * Route to delete a user by ID, with different behavior for admin and host users.
 * @param {string} currentUserId - ID of the current user who is attempting the delete.
 * @param {string} deleteId - ID of the user to be deleted.
 */
router.delete("/:currentUserId/:deleteId", async (req, res) => {
  const { currentUserId, deleteId } = req.params;

  try {
    const currentUser = await getUserById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    const isAdmin = currentUser.roles && currentUser.roles.includes(Role.ADMIN);
    const isHost = currentUser.roles && currentUser.roles.includes(Role.HOST);
    if (!isAdmin && !isHost) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this user" });
    }

    if (isAdmin) {
      await deleteUser(deleteId);
      return res.status(200).json({
        message: `User with ID ${deleteId} has been deleted successfully.`,
      });
    }

    if (isHost) {
      // If the current user is a host, ensure that the delete user has a matching bossId
      const deleteUserDetails = await getUserById(deleteId);

      if (!deleteUserDetails) {
        return res
          .status(404)
          .json({ message: "User to be deleted not found" });
      }

      if (deleteUserDetails.bossId !== currentUserId) {
        return res.status(403).json({
          message: "You can only delete users under your supervision",
        });
      }

      await deleteUser(deleteId);
      return res.status(200).json({
        message: `User with ID ${deleteId} has been deleted successfully.`,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
