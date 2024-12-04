import mongoose from "mongoose";

const schema =  mongoose.Schema({

    Name:String,
    Username:String,
    University:String,
    Facualty:String,
    Email:String,
    Phone:String

});

const userModel = mongoose.model('User',schema);

export default userModel;