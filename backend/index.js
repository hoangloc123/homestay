import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { checkFirestoreConnection } from "./firebase/firestore/test.firestore.js";

import accommodationRoutes from "./routes/accommodation.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/authentication.route.js";
import requestRoute from "./routes/request.route.js";
import statisticRoute from "./routes/statistic.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

await connectDB();

await checkFirestoreConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/accommodations", accommodationRoutes);
app.use("/tickets", ticketRoutes);
app.use("/users", userRoutes);
app.use("/requests", requestRoute);
app.use("/statistics", statisticRoute);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
