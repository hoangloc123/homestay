import express from 'express';

import Ticket from '../models/schemas/Ticket.schema.js';

const router = express.Router();

router.get('/:id/tickets', async (req, res) => {
    try {
        const { id } = req.params;

        const tickets = await Ticket
            .find({ userId: id })
            .populate({
                path: 'accommodationId',
                select: 'name city address'
            });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this user' });
        }

        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
