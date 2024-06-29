// models/user.js
import mongoose from 'mongoose';

const crimeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    crimeTitle:{
        required:true,
        type:String,
    },
    crimeDescription:{
        required:true,
        type:String
    },
    crimePhoto:{
        type:String
    },
    crimeVideo:{
        type:String
    },
    crimeDate:{
        type:Date,
        required:true,
    },
    crimeTime:{
        type:String,
        required:true,
    },
    latitude:{
        type:String,
        required:true,
    },
    longitude:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["reported","under_investigation","resolved"],
        default:"reported"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Crime = mongoose.model('Crime', crimeSchema);

export default Crime;
