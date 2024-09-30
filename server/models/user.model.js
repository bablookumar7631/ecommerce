import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum:['admin', 'user'],
        default: 'user',
        required: true
    },
    address: {
        type: String,
    },
    pincode: {
        type: String,
    },
    state: {
        type: String,
    },
    profilePhoto: {
        type: String,
        default: ''
    }
},{timestamps:true});
export const User = mongoose.model('User', userSchema);