import express from "express";

import Ticket from "../models/schemas/Ticket.schema.js";
import Accommodation from "../models/schemas/Accommodation.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      accommodationId,
      rooms,
      fromDate,
      toDate,
      isPaid = false,
      isConfirmed = false,
      isCanceled = false,
      totalPrice,
    } = req.body;

    if (!userId || !accommodationId || !fromDate || !toDate || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (fromDate >= toDate) {
      return res.status(400).json({ message: "Invalid booking time period" });
    }

    const accommodation = await Accommodation.findById(
      accommodationId,
    ).populate({
      path: "rooms",
      select: "name capacity quantity pricePerNight amenities",
    });
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    if (!rooms.length) {
      // Ensure accommodation type is [0, 1, 2]
      if (![0, 1, 2].includes(accommodation.type)) {
        return res.status(400).json({
          message: "Rooms are required for this type of accommodation",
        });
      }

      // Check for overlapping tickets
      const existingTickets = await Ticket.find({
        accommodation: accommodationId,
        $or: [
          { fromDate: { $lte: fromDate }, toDate: { $gte: toDate } },
          { fromDate: { $gte: fromDate, $lte: toDate } },
          { toDate: { $gte: fromDate, $lte: toDate } },
        ],
      });

      if (existingTickets.length > 0) {
        return res.status(400).json({
          message: "Accommodation is already booked for the given period",
        });
      }
    } else {
      if ([0, 1, 2].includes(accommodation.type)) {
        return res.status(400).json({
          message:
            "Rooms should not be provided for this type of accommodation",
        });
      }

      for (const { roomId, bookedQuantity } of rooms) {
        const room = accommodation.rooms.find(
          (r) => r._id.toString() === roomId,
        );
        if (!room) {
          return res.status(404).json({
            message: `Room with ID ${roomId} not found in the accommodation`,
          });
        }

        const overlappingTickets = await Ticket.find({
          accommodation: accommodationId,
          rooms: { $elemMatch: { roomId } },
          isCanceled: true,
          $or: [
            { fromDate: { $lte: fromDate }, toDate: { $gte: toDate } },
            { fromDate: { $gte: fromDate, $lte: toDate } },
            { toDate: { $gte: fromDate, $lte: toDate } },
          ],
        });

        const totalBookedQuantity = overlappingTickets.reduce((sum, ticket) => {
          const roomBooking = ticket.rooms.find((r) => r.roomId === roomId);
          return sum + (roomBooking?.bookedQuantity || 0);
        }, 0);

        const availableQuantity = room.quantity - totalBookedQuantity;
        if (availableQuantity < bookedQuantity) {
          return res.status(400).json({
            message: `Room ${room.name} has insufficient availability. Only ${availableQuantity} rooms left.`,
          });
        }
      }
    }

    const newTicket = new Ticket({
      userId,
      accommodation: accommodationId,
      rooms: rooms,
      fromDate,
      toDate,
      isPaid,
      isConfirmed,
      isCanceled,
      totalPrice,
    });

    if (!newTicket.rooms?.length) {
      newTicket.bookedQuantity = 1;
    }

    const savedTicket = await newTicket.save();

    res.status(201).json({ ticket: savedTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const { isPaid, isConfirmed, isCanceled } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    let msg = "";
    // Handle payment logic
    if (isPaid) {
      msg = "PAID";
      // TODO: IMPLEMENT Payment function
      // await functionA(ticket); // Call functionA before updating payment status
      ticket.isPaid = isPaid;
    }

    // Handle cancellation logic
    if (isCanceled) {
      msg = "CANCELED";
      // TODO: IMPLEMENT Cancel function
      // await functionB(ticket); // Call functionB before updating cancellation status
      ticket.isCanceled = isCanceled;
    }

    // Handle confirmation logic
    if (isConfirmed) {
      msg = "CONFIRMED";
      ticket.isConfirmed = isConfirmed;
    }

    const updatedTicket = await ticket.save();
    res
      .status(200)
      .json({
        message: `Ticket updated successfully: ${msg}`,
        ticket: updatedTicket,
      });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error retrieving ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
