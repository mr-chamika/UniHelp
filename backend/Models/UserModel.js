import mongoose from "mongoose";

const schema = mongoose.Schema({

    Name: String,
    Username: String,
    University: String,
    Facualty: String,
    Email: String,
    Phone: String,
    Password: String,
    Role: { type: String, default: "user" },
    Events: { type: Number, default: 0 }

}, { timestamps: true });

const userModel = mongoose.model('User', schema);

export default userModel;