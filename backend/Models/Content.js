import mongoose from 'mongoose';

const schema = mongoose.Schema({

    userId: String,
    name: String,
    type: String,
    parentId: { type: String, default: null },
    content: { type: String, default: null },
    filePath: String

}, { timestamps: true })

const Content = mongoose.model('Content', schema);

export default Content;