import mongoose from "mongoose";

const RoomBookingSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    bookedQuantity: { type: Number, required: true }
});

const TicketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    accomodationId: { type: String, required: true },
    rooms: { type: [RoomBookingSchema] },
    bookedQuantity: { type: Number, default: 1 },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    isConfirmed: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true },
});

export default mongoose.model("Ticket", TicketSchema);