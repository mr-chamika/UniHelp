import mongoose from 'mongoose'

const schema = mongoose.Schema({

    userId: String,
    id: Number,
    start: String,
    end: String,
    subject: String

}, { timestamps: true })

const RowModel = mongoose.model('Row', schema)

export default RowModel;