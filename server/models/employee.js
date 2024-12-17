import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },
    role: {
        type: String,
        enum: ['Engineer', 'Tester', 'Designer', 'Quality Control', 'Fresher', 'Intern'],
        default: 'Fresher'
    },
},{timestamps:true});

export const Employee = mongoose.model('Employee',employeeSchema);