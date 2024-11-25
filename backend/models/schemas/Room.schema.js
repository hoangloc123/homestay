import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: [{ type: String }],
    quantity: { type: Number, required: true },
});

export default mongoose.model("Room", RoomSchema);
