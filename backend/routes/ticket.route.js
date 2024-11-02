import express from 'express';

import Ticket from '../models/schemas/Ticket.schema.js';
import Accomodation from '../models/schemas/Accomodation.schema.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {
            userId,
            accomodationId,
            rooms,
            fromDate,
            toDate,
            isPaid = false,
            isConfirmed = false,
            totalPrice
        } = req.body;

        if (!userId || !accomodationId || !fromDate || !toDate || !totalPrice) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const accomodation = await Accomodation.findById(accomodationId);
        if (!accomodation) {
            return res.status(404).json({ message: 'Accomodation not found' });
        }

        const hasRoomIds = accomodation.roomIds?.length > 0;

        if (!hasRoomIds && rooms?.length > 0) {
            return res.status(400).json({
                message: 'Invalid booking information: Homestay bookings should not contain rooms information'
            });
        }

        if (hasRoomIds) {
            if (!rooms?.length) {
                return res.status(400).json({
                    message: 'Invalid booking information: Hotel bookings must include rooms information'
                });
            }
            else {
                const bookedRoom = rooms?.map(room => room.roomId);

                if (hasRoomIds) {
                    const isValidRooms = bookedRoom.every(roomId => accomodation.roomIds.includes(roomId));
                    if (!isValidRooms) {
                        return res.status(400).json({
                            message: 'Invalid booking information: All rooms must be valid for the selected accomodation'
                        });
                    }
                }
            }
        }

        const newTicket = new Ticket({
            userId,
            accomodationId,
            rooms: rooms,
            fromDate,
            toDate,
            isPaid,
            isConfirmed,
            totalPrice
        });

        if (!newTicket.rooms?.length) {
            newTicket.bookedQuantity = 1;
        }

        const savedTicket = await newTicket.save();

        res.status(201).json({
            message: 'Ticket created successfully',
            ticket: savedTicket
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error retrieving ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;