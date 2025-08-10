import Router from 'express';

const router = new Router();

import { createEvent, getEvents, deleteEvents, editEvent, createTimeslot, getTimeslot, editTimeslot, deleteTimeslot } from '../Controllers/eventController.js';
router.post('/create', createEvent);
router.get('/get/:id', getEvents);
router.get('/get-timeslot/:userId/:id', getTimeslot)
router.delete('/:id', deleteEvents);
router.put('/:id', editEvent);
router.post('/create-timeslot', createTimeslot)
router.put('/slot/:id', editTimeslot)
router.delete('/slot/:id', deleteTimeslot)

export default router;