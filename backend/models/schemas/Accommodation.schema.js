import mongoose from "mongoose";

const AccommodationSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  pricePerNight: { type: Number },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy" },
  amenities: [{ type: String }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  lat: { type: String },
  lng: { type: String },
  images: [{ type: String }],
  description: { type: String, required: true },
  noteAccommodation: { type: String },
  type: { type: Number },
  isVerified: { type: Boolean, default: false },
});

AccommodationSchema.index({ city: 1, pricePerNight: 1 });

export default mongoose.model("Accommodation", AccommodationSchema);
