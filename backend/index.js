import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import {checkFirestoreConnection} from "./firebase/firestore/test.firestore.js";

import accomodationRoutes from "./routes/accomodation.route.js";
import amenityRoutes from "./routes/amenity.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

await connectDB();

await checkFirestoreConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/accomodations', accomodationRoutes);
app.use('/amenities', amenityRoutes);
app.use('/tickets', ticketRoutes);
app.use('/users', userRoutes);
app.use(cookieParser());

app.listen(port, () => {console.log(`Server running on port ${port}`)});
