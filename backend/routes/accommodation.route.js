import express from "express";
import removeAccents from "remove-accents";
const router = express.Router();

import Accommodation from "../models/schemas/Accommodation.schema.js";
import Policy from "../models/schemas/Policy.schema.js";
import Room from "../models/schemas/Room.schema.js";
import Ticket from "../models/schemas/Ticket.schema.js";

router.post('/', async (req, res) => {
    try {
        const {
            ownerId,
            name,
            city,
            address,
            pricePerNight,
            amenities = [],
            lat,
            lng,
            images,
            description,
            noteAccommodation,
            type = 0
        } = req.body;

    // Validate required field
    if (!ownerId || !name || !city || !address || !description) {
    return res.status(400).json({ message: 'Some required field are missing' });
    }

    const newAccommodation = new Accommodation({
        ownerId,
        name,
        city,
        address,
        pricePerNight,
        amenities,
        lat,
        lng,
        images,
        description,
        noteAccommodation,
        type
    });

    const savedAccommodation = await newAccommodation.save();

    res.status(201).json({ accommodationId: savedAccommodation.id });
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}
});

router.get('/', async (req, res) => {
    try {
        const { city, fromDate, toDate, capacity, roomQuantity, isWithPet, amenities = '', page = 1, limit = 10 } = req.query;

        if (!city) {
            return res.status(400).json({ message: 'City is required for search' });
        }

        if (!fromDate || !toDate || !roomQuantity) {
            return res.status(400).json({ message: 'Missing required fields: fromDate, toDate, or roomQuantity' });
        }

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const amenitiesArray = amenities ? amenities.split(',').map(a => a.trim()) : [];
        console.log(amenities, amenitiesArray)
        const isWithPetBool = isWithPet.toLowerCase() === 'true';

        const accommodations = await Accommodation
            .find({
                city: { $regex: city.toLowerCase(), $options: 'i' },
                ...(isWithPetBool && { 'policy.allowPetPolicy': true }),
                ...(amenitiesArray.length > 0 && {
                    amenities: { $all: amenitiesArray }
                })
            })
            // .skip((pageNumber - 1) * limitNumber)
            // .limit(limitNumber)
            .populate({
                path: 'rooms',
                select: 'name capacity quantity pricePerNight amenities',
                match: function () {
                    return function (doc) {
                        if ([0, 1, 2].includes(doc.type)) {
                            return {};
                        }
                        return amenitiesArray.length > 0
                            ? { amenities: { $all: amenitiesArray } }
                            : {};
                    };
                }(),
            })
            .populate('policy', 'checkIn checkOut cancellationPolicy additionalPolicy allowPetPolicy paymentMethod -_id');

        let filteredAccommodations = [];

        for (const accommodation of accommodations) {
            let isAccommodationValid = true;

            for (const room of accommodation.rooms) {
                const tickets = await Ticket.find({
                    accommodation: accommodation._id,
                    rooms: { $elemMatch: { roomId: room._id.toString() } },
                    $or: [
                        { fromDate: { $lte: fromDate }, toDate: { $gte: toDate } },
                        { fromDate: { $gte: fromDate, $lte: toDate } },
                        { toDate: { $gte: fromDate, $lte: toDate } }
                    ]
                });

                const bookedQuantity = tickets.reduce((sum, ticket) => {
                    const bookedRoom = ticket.rooms.find(r => r.roomId === room._id.toString());
                    return sum + (bookedRoom?.bookedQuantity || 0);
                }, 0);

                const availableRooms = room.quantity - bookedQuantity;

                if (availableRooms < roomQuantity) {
                    isAccommodationValid = false;
                    break;
                }
            }

            if (isAccommodationValid) {
                filteredAccommodations.push(accommodation);
            }
        }

        const total = filteredAccommodations.length;
        const paginatedAccommodations = filteredAccommodations.slice(
            (pageNumber - 1) * limitNumber,
            pageNumber * limitNumber
        );

        res.status(200).json({
            accommodations: paginatedAccommodations,
            pagination: {
                total: total,
                pages: Math.ceil(total / limitNumber),
                pageSize: limitNumber,
                current: pageNumber
            }
        });
    } catch (error) {
        console.error('Error searching accommodations by name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const accommodation = await Accommodation.findById(id)
            .populate('policy', ['checkIn', 'checkOut', 'cancellationPolicy', 'additionalPolicy', 'allowPetPolicy', 'paymentMethod'])

        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }

        res.status(200).json(accommodation);
    } catch (error) {
        console.error('Error fetching accommodation details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:id/policy', async (req, res) => {
    try {
        const { id } = req.params;
        const { checkIn, checkOut, cancellationPolicy, additionalPolicy, allowPetPolicy, ageLimitPolicy, paymentMethod = [] } = req.body;

        // Validate required fields for policy
        if (!checkIn || !checkOut) {
            return res.status(400).json({ message: 'Check-in and Check-out are required fields' });
        }

        // Find the accommodation by ID
        const accommodation = await Accommodation.findById(id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }

        // Create new Policy document
        const newPolicy = new Policy({
            checkIn,
            checkOut,
            cancellationPolicy,
            additionalPolicy,
            allowPetPolicy,
            ageLimitPolicy,
            paymentMethod
        });

        const savedPolicy = await newPolicy.save();

        // Update Accommodation with new Policy ID
        accommodation.policy = savedPolicy._id;
        await accommodation.save();

        res.status(201).json({ policyId: savedPolicy.id });
    } catch (error) {
        console.error('Error adding policy:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:id/rooms', async (req, res) => {
    try {
        const { id } = req.params;
        const { rooms } = req.body;

        const accommodation = await Accommodation.findById(id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
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
                amenities = [],
                quantity
            } = roomData;

            const newRoom = new Room({
                name,
                capacity,
                pricePerNight,
                amenities,
                quantity,
            });
            // NOTE: property 'available' is not defined in Room schema, it's a computed props.

            const savedRoom = await newRoom.save();
            createdRooms.push(savedRoom);
        }

        accommodation.rooms.push(...createdRooms.map(room => room._id));
        await accommodation.save();

        res.status(201).json({
            message: `${createdRooms.length} rooms created successfully for accommodation with id: ${id}`,
        });
    } catch (error) {
        console.error('Error creating rooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id/rooms', async (req, res) => {
    try {
        const { id } = req.params;

        const accommodation = await Accommodation.findById(id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }

        const rooms = await Room.find({ _id: { $in: accommodation.rooms } });

        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
