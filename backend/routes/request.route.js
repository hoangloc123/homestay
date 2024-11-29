import express from "express";
import {
  approveRequest,
  getRequests,
} from "../firebase/firestore/requests.firestore.js";
import moment from "moment";

const router = express.Router();

/**
 * Approve or reject a request by ID
 */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isApprove } = req.body;

    if (typeof isApprove !== "boolean") {
      return res.status(400).json({ message: "isApprove must be a boolean" });
    }

    await approveRequest(id, isApprove);
    res.status(200).json({ message: "Request processed successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Get requests based on filters.
 * Query parameters:
 * - isResolved (boolean, optional, default: false)
 * - target (string, optional)
 * - actionNeeded (string, optional)
 */
router.get("/", async (req, res) => {
  try {
    const { isResolved = "false", target, actionNeeded } = req.query;

    const resolvedStatus = isResolved === "true";
    const requests = await getRequests(resolvedStatus, target, actionNeeded);

    res.status(200).json(
      requests.map((req) => ({
        ...req,
        date: moment(req.date.toDate()).format("YYYY-MM-DD"),
      })),
    );
  } catch (error) {
    console.error("Error retrieving requests:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
