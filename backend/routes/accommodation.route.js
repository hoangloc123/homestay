import express from "express";
import removeAccents from "remove-accents";
const router = express.Router();

import Accommodation from "../models/schemas/Accommodation.schema.js";
import Policy from "../models/schemas/Policy.schema.js";
import Room from "../models/schemas/Room.schema.js";
import Ticket from "../models/schemas/Ticket.schema.js";
import { searchUsersByKeyword } from "../firebase/firestore/users.firestore.js";

// Helper method
const getPricePerNight = (accommodation, isAscending) => {
  if ([0, 1, 2].includes(accommodation.type)) {
    return accommodation.pricePerNight;
  } else {
    const roomPrices = accommodation.rooms.map((room) => room.pricePerNight);
    return isAscending ? Math.min(...roomPrices) : Math.max(...roomPrices);
  }
};

router.post("/", async (req, res) => {
  try {
    const {
      ownerId,
      name,
      city,
      avatar,
      address,
      pricePerNight,
      amenities = [],
      lat,
      lng,
      images = [],
      description,
      noteAccommodation,
      type,
      outstanding,
      options,
      activities,
    } = req.body;

    // Validate required fields
    if (!ownerId || !name || !city || !address || !description) {
      return res
        .status(400)
        .json({ message: "Some required fields are missing" });
    }

    const newAccommodation = new Accommodation({
      ownerId,
      name,
      city,
      avatar,
      address,
      pricePerNight: pricePerNight || 0,
      amenities,
      lat,
      lng,
      images,
      description,
      noteAccommodation,
      type,
      outstanding,
      options,
      activities,
      isVerified: false,
    });

    const savedAccommodation = await newAccommodation.save();

    res.status(201).json({ accommodationId: savedAccommodation.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      city,
      fromDate,
      toDate,
      capacity,
      roomQuantity,
      isWithPet,
      amenities = "",
      pricePerNight,
      type,
      orderBy = "0",
      page = 1,
      limit = 10,
    } = req.query;

    if (!city || !fromDate || !toDate || !roomQuantity || !pricePerNight) {
      return res.status(400).json({
        message:
          "Missing required fields: city, fromDate, toDate, roomQuantity, pricePerNight",
      });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const capacityNumber = capacity ? parseInt(capacity, 10) : 2;
    const amenitiesArray = amenities
      ? amenities.split(",").map((a) => a.trim())
      : [];
    const isWithPetBool = isWithPet.toLowerCase() === "true";
    const pricePerNightRange = pricePerNight
      .split(",")
      .map((price) => parseInt(price.trim(), 10));
    const typeFilter = type
      ? { type: { $in: type.split(",").map((t) => parseInt(t.trim(), 10)) } }
      : {};

    const accommodations = await Accommodation.find({
      isVerified: true,
      city: { $regex: city.toLowerCase(), $options: "i" },
      ...(isWithPetBool && { "policy.allowPetPolicy": true }),
      ...(amenitiesArray.length > 0 && {
        amenities: { $all: amenitiesArray },
      }),
      typeFilter,
      $or: [
        { pricePerNight: 0 },
        {
          pricePerNight: {
            $gte: pricePerNightRange[0],
            $lte: pricePerNightRange[1],
          },
        },
      ],
    })
      .populate({
        path: "rooms",
        select: "name capacity quantity pricePerNight amenities",
        match: (function () {
          return function (doc) {
            if ([0, 1, 2].includes(doc.type)) {
              return {};
            }

            const capacityMatch = { capacity: { $gte: capacityNumber } };

            const amenitiesMatch =
              amenitiesArray.length > 0
                ? { amenities: { $all: amenitiesArray } }
                : {};

            const priceMatch = {
              pricePerNight: {
                $gte: pricePerNightRange[0],
                $lte: pricePerNightRange[1],
              },
            };

            return { ...amenitiesMatch, ...capacityMatch, ...priceMatch };
          };
        })(),
      })
      .populate(
        "policy",
        "checkIn checkOut cancellationPolicy additionalPolicy allowPetPolicy paymentMethod -_id",
      );

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
            { toDate: { $gte: fromDate, $lte: toDate } },
          ],
        });

        const bookedQuantity = tickets.reduce((sum, ticket) => {
          const bookedRoom = ticket.rooms.find(
            (r) => r.roomId === room._id.toString(),
          );
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

    if (orderBy === "0") {
      // Order by rating
      filteredAccommodations.sort((a, b) => b.rating - a.rating);
    } else {
      // Order by pricePerNight
      filteredAccommodations.sort((a, b) => {
        const priceA = getPricePerNight(a, orderBy === "1");
        const priceB = getPricePerNight(b, orderBy === "1");

        return orderBy === "1" ? priceA - priceB : priceB - priceA;
      });
    }

    const total = filteredAccommodations.length;
    const paginatedAccommodations = filteredAccommodations.slice(
      (pageNumber - 1) * limitNumber,
      pageNumber * limitNumber,
    );

    res.status(200).json({
      accommodations: paginatedAccommodations,
      pagination: {
        total: total,
        pages: Math.ceil(total / limitNumber),
        pageSize: limitNumber,
        current: pageNumber,
      },
    });
  } catch (error) {
    console.error("Error searching accommodations by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/managed-verification", async (req, res) => {
  try {
    const { page = "1", limit = "10", isVerified, keyword, city } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let query = {};
    if (isVerified !== undefined) {
      query.isVerified = isVerified === "true";
    }
    if (city) {
      query.city = city;
    }

    let ownerIds = [];
    if (keyword) {
      const users = await searchUsersByKeyword(keyword);
      ownerIds = users.map((user) => user.id);
      if (ownerIds.length === 0) {
        return res
          .status(200)
          .json({
            accommodations: [],
            pagination: {
              total: 0,
              pages: 0,
              pageSize: limitNumber,
              current: 1,
            },
          });
      }
      query.ownerId = { $in: ownerIds };
    }

    const total = await Accommodation.countDocuments(query);
    const accommodations = await Accommodation.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate(
        "policy",
        "checkIn checkOut cancellationPolicy additionalPolicy allowPetPolicy paymentMethod",
      )
      .populate("rooms", "name capacity quantity pricePerNight amenities");

    const pagination = {
      total,
      pages: Math.ceil(total / limitNumber),
      pageSize: limitNumber,
      current: pageNumber,
    };

    res.status(200).json({
      accommodations,
      pagination,
    });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const accommodation = await Accommodation.findById(id)
      .populate(
        "policy",
        "checkIn checkOut cancellationPolicy additionalPolicy allowPetPolicy paymentMethod",
      )
      .populate(
        "rooms",
        "name capacity quantity pricePerNight amenities description",
      );

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.status(200).json(accommodation);
  } catch (error) {
    console.error("Error fetching accommodation details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id/verify", async (req, res) => {
  try {
    const { id } = req.params;

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    accommodation.isVerified = true;
    await accommodation.save();

    res
      .status(200)
      .json({ message: "Accommodation verified successfully", accommodation });
  } catch (error) {
    console.error("Error verifying accommodation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:id/policy", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      checkIn,
      checkOut,
      cancellationPolicy,
      additionalPolicy,
      allowPetPolicy,
      ageLimitPolicy,
      paymentMethod = [],
    } = req.body;

    // Validate required fields for policy
    if (!checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: "Check-in and Check-out are required fields" });
    }

    // Find the accommodation by ID
    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    // Create new Policy document
    const newPolicy = new Policy({
      checkIn,
      checkOut,
      cancellationPolicy,
      additionalPolicy,
      allowPetPolicy,
      ageLimitPolicy,
      paymentMethod,
    });

    const savedPolicy = await newPolicy.save();

    // Update Accommodation with new Policy ID
    accommodation.policy = savedPolicy._id;
    await accommodation.save();

    res.status(201).json({ policyId: savedPolicy.id });
  } catch (error) {
    console.error("Error adding policy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:id/rooms", async (req, res) => {
  try {
    const { id } = req.params;
    const { rooms } = req.body;

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    if (!rooms || rooms.length === 0) {
      return res.status(400).json({ message: "No rooms provided" });
    }

    const createdRooms = [];

    for (let roomData of rooms) {
      const {
        name,
        capacity,
        pricePerNight,
        amenities = [],
        quantity,
        description,
      } = roomData;

      const newRoom = new Room({
        name,
        capacity,
        pricePerNight,
        amenities,
        quantity,
        description,
      });
      // NOTE: property 'available' is not defined in Room schema, it's a computed props.

      const savedRoom = await newRoom.save();
      createdRooms.push(savedRoom);
    }

    accommodation.rooms.push(...createdRooms.map((room) => room._id));
    await accommodation.save();

    res.status(201).json({
      message: `${createdRooms.length} rooms created successfully for accommodation with id: ${id}`,
    });
  } catch (error) {
    console.error("Error creating rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id/rooms", async (req, res) => {
  try {
    const { id } = req.params;

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    const rooms = await Room.find({ _id: { $in: accommodation.rooms } });

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error retrieving rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
