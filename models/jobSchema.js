import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide job title"],
        min: [3, "Job title must contain at least 3 characters!"],
        max: [50,"Job title cannot exceed 50 characters!"],
    },
    description:{
        type:String,
        required: [true, "Please provide job description"],
        min: [3, "Job description must contain at least 50 charactera!"],
        max: [350, "Job description cannot exceed 350 characters !"],
    },
    category: {
        type:String,
        required: [true, "Job category is required"],
    },
    country: {
        type:String,
        required: [true, "Job country is required"],
    },
    city: {
        type:String,
        required: [true, "Job city is required"],
    },
    location: {
        type:String,
        required: [true, "Please provie exact location!"],
        min: [50, "Job location must contain at least 50 characters"],
    },
    fixedSalary: {
        type:Number,
        min: [4,"Fixed salary must contain at least 4 digits!"],
        max: [999999999,"Fixed salary cannot exceed 9 digits!"],
    },
    salaryFrom: {
        type:Number,
        min: [4,"Salary  must contain at least 4 digits!"],
        max: [999999999,"Salary cannot exceed 9 digits!"],
    },
    salaryTo: {
        type:Number,
        min: [4,"SalaryTo must contain at least 4 digits!"],
        max: [999999999,"SalaryTo cannot exceed 9 digits!"],
    },
    expired: {
        type:Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);