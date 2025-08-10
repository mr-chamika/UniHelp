import Event from '../Models/EventModel.js'
import User from '../Models/UserModel.js'
import Row from '../Models/Row.js'

export const createEvent = async (req, res) => {

    const { userId, title, start, end } = req.body;

    const user = await User.findByIdAndUpdate({ _id: userId }, { $inc: { Events: 1 } });

    const event = new Event({
        userId: userId,
        title: title,
        start: start,
        end: end

    })

    await event.save();

    if (event) { res.json({ count: user.Events + 1 }) }

}

export const getEvents = async (req, res) => {

    const events = await Event.find({ userId: req.params.id.toString() });

    if (events) {

        res.json({ events })

    } else {

        res.json({ message: 'No events found' })

    }

}

export const deleteEvents = async (req, res) => {

    const event = await Event.findOne({ _id: req.params.id.toString() })

    const user = await User.findByIdAndUpdate({ _id: event.userId.toString() }, { $inc: { Events: -1 } })

    await event.deleteOne();

    res.json({ count: user.Events - 1 })

}

export const editEvent = async (req, res) => {

    const id = req.params.id.toString();

    const { title, start, end } = req.body;

    await Event.findByIdAndUpdate({ _id: id }, { $set: { title: title, start: start, end: end } })

    res.json({ message: 'event updated successfully' });

}

export const createTimeslot = async (req, res) => {

    const { userId, active, row1, row2, row3, row4 } = req.body;

    const r1 = await new Row({ userId: userId, id: active, start: row1.start, end: row1.end, subject: row1.subject })
    const r2 = await new Row({ userId: userId, id: active, start: row2.start, end: row2.end, subject: row2.subject })
    const r3 = await new Row({ userId: userId, id: active, start: row3.start, end: row3.end, subject: row3.subject })
    const r4 = await new Row({ userId: userId, id: active, start: row4.start, end: row4.end, subject: row4.subject })


    await r1.save()
    await r2.save()
    await r3.save()
    await r4.save()

    res.json('success')

}

export const getTimeslot = async (req, res) => {

    const id = req.params.id.toString()
    const userId = req.params.userId.toString()

    const slots = await Row.find({ id: id, userId: userId })

    res.json({ slots });

}

export const editTimeslot = async (req, res) => {

    const id = req.params.id.toString()

    const { row1, row2, row3, row4 } = req.body;

    const slots = await Row.find({ id: id })

    await Row.findByIdAndUpdate({ _id: slots[0]._id }, { $set: { start: row1.start, end: row1.end, subject: row1.subject } })
    await Row.findByIdAndUpdate({ _id: slots[1]._id }, { $set: { start: row2.start, end: row2.end, subject: row2.subject } })
    await Row.findByIdAndUpdate({ _id: slots[2]._id }, { $set: { start: row3.start, end: row3.end, subject: row3.subject } })
    await Row.findByIdAndUpdate({ _id: slots[3]._id }, { $set: { start: row4.start, end: row4.end, subject: row4.subject } })

    res.json('table updated successfully');

}

export const deleteTimeslot = async (req, res) => {

    const id = req.params.id.toString()

    await Row.deleteMany({ id: id })

    res.json('rows deleted successfully')

}