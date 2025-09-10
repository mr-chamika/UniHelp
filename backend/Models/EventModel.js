import mongoose from "mongoose";

const schema = mongoose.Schema({

    userId: String,
    title: String,
    start: String,
    end: String,
    status: String//"pending","missed","completed"

}, { timestamps: true })

const eventModel = mongoose.model('Event', schema);

export default eventModel;
