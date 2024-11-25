import mongoose from "mongoose";

const AccommodationSchema = new mongoose.Schema({
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pricePerNight: { type: Number },
    policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
    amenities: [{type: String}],
    roomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
    lat: { type: String },
    lng: { type: String },
    images: [{ type: String }],
    description: { type: String, required: true },
    noteAccomodation: { type: String },
    type: {type: String}
});

export default mongoose.model("Accommodation", AccommodationSchema);
