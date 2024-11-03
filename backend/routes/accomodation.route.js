import express from "express";
import removeAccents from "remove-accents";
const router = express.Router();

import Accomodation from "../models/schemas/Accomodation.schema.js";
import Amenity from "../models/schemas/Amenity.schema.js";
import Policy from "../models/schemas/Policy.schema.js";
import Room from "../models/schemas/Room.schema.js";

router.post('/', async (req, res) => {
    try {
        const {
            ownerId,
            name,
            city,
            address,
            pricePerNight,
            policyId,
            // already created amenities
            amenityIds = [],
            // new amenities that need to be created
            amenities = [],
            isAvailable,
            roomIds,
            lat,
            lng,
            images,
            description,
            noteAccomodation
        } = req.body;

    // Validate required field
    if (!ownerId || !name || !city || !address || !description) {
    return res.status(400).json({ message: 'Some required field are missing' });
    }

    // Check if there's any new amenity.
    if (amenities.length > 0) {
    const newAmenities = await Amenity.insertMany(amenities.map(amenity => ({ name: amenity })));
    const newAmenityIds = newAmenities.map(amenity => amenity._id);
    amenityIds.push(...newAmenityIds);
    }

    const newAccomodation = new Accomodation({
        ownerId,
        name,
        city,
        address,
        pricePerNight,
        policyId,
        amenityIds,
        isAvailable,
        roomIds,
        lat,
        lng,
        images,
        description,
        noteAccomodation
    });

    const savedAccomodation = await newAccomodation.save();

    res.status(201).json({ message: 'Accomodation created successfully', accomodation: savedAccomodation });
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}
});

router.get('/', async (req, res) => {
    try {
        const { city, page = 1, limit = 10 } = req.query;

        if (!city) {
            return res.status(400).json({ message: 'City is required for search' });
        }

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const accomodations = await Accomodation
            .find({
                city: { $regex: city.toLowerCase(), $options: 'i' }
            })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate('amenityIds');

        const total = await Accomodation.countDocuments({
            city: { $regex: city.toLowerCase(), $options: 'i' }
        });

        res.status(200).json({
            accomodations,
            pagination: {
                total: total,
                pages: Math.ceil(total / limitNumber),
                pageSize: limitNumber,
                current: pageNumber
            }
        });
    } catch (error) {
        console.error('Error searching accomodations by name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const accomodation = await Accomodation.findById(id)
            .populate('policyId')

        if (!accomodation) {
            return res.status(404).json({ message: 'Accomodation not found' });
        }

        res.status(200).json(accomodation);
    } catch (error) {
        console.error('Error fetching accomodation details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:id/policy', async (req, res) => {
    try {
        const { id } = req.params;
        const { checkIn, checkOut, cancellationPolicy, additionalPolicy } = req.body;

        // Validate required fields for policy
        if (!checkIn || !checkOut) {
            return res.status(400).json({ message: 'Check-in and Check-out are required fields' });
        }

        // Find the accomodation by ID
        const accomodation = await Accomodation.findById(id);
        if (!accomodation) {
            return res.status(404).json({ message: 'Accomodation not found' });
        }

        // Create new Policy document
        const newPolicy = new Policy({
            checkIn,
            checkOut,
            cancellationPolicy,
            additionalPolicy
        });

        const savedPolicy = await newPolicy.save();

        // Update Accomodation with new Policy ID
        accomodation.policyId = savedPolicy._id;
        await accomodation.save();

        res.status(201).json({ message: 'Policy created and added to accomodation successfully', policy: savedPolicy });
    } catch (error) {
        console.error('Error adding policy:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:id/rooms', async (req, res) => {
    try {
        const { id } = req.params;
        const { rooms } = req.body;

        const accomodation = await Accomodation.findById(id);
        if (!accomodation) {
            return res.status(404).json({ message: 'Accomodation not found' });
        }

        if (!rooms || rooms.length === 0) {
            return res.status(400).json({ message: 'No rooms provided' });
        }

        const createdRooms = [];

        for (let roomData of rooms) {
            const {
                name,
                capacity,
                pricePerNight,
                amenityIds = [],
                amenities = [],
                quantity
            } = roomData;

            if (amenities.length > 0) {
                const newAmenities = await Amenity.insertMany(amenities.map(amenity => ({ name: amenity })));
                const newAmenityIds = newAmenities.map(amenity => amenity._id);
                amenityIds.push(...newAmenityIds);
            }

            const newRoom = new Room({
                name,
                capacity,
                pricePerNight,
                amenityIds,
                quantity,
            });
            // NOTE: propety 'available' is not defined in Room schema, it's a computed props.

            const savedRoom = await newRoom.save();
            createdRooms.push(savedRoom);
        }

        accomodation.roomIds.push(...createdRooms.map(room => room._id));
        await accomodation.save();

        res.status(201).json({
            message: `${createdRooms.length} rooms created successfully`,
            rooms: createdRooms
        });
    } catch (error) {
        console.error('Error creating rooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id/rooms', async (req, res) => {
    try {
        const { id } = req.params;

        const accomodation = await Accomodation.findById(id);
        if (!accomodation) {
            return res.status(404).json({ message: 'Accomodation not found' });
        }

        const rooms = await Room.find({ _id: { $in: accomodation.roomIds } });

        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;