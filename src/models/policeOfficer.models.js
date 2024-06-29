// models/user.js
import mongoose from 'mongoose';

const policeOfficerSchema = new mongoose.Schema({
    officerId:{
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isVerified:{
        type:String,
        enum:["verified","rejected","pending"],
        required:true,
        default:"pending"
    },
    token:{
        type:String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const PoliceOfficer = mongoose.model('PoliceOfficer', policeOfficerSchema);

export default PoliceOfficer;
