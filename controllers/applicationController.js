import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"; 
import {Application} from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = catchAsyncError(async (req, res, next)=>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler(
                "Job Seeker is not allowed to access this resources!",
                400
            )
        );
    }
    const {_id} = req.user;
    const applications = await Application.find({'employerID.user': _id});
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobseekerGetAllApplications = catchAsyncError(async (req, res, next)=>{
    const { role } = req.user;
    if(role === "Employer"){
        return next(
            new ErrorHandler(
                "Employer is not allowed to access this resources!",
                400
            )
        );
    }
    const {_id} = req.user;
    const applications = await Application.find({'applicantID.user': _id});
    res.status(200).json({
        success: true,
        applications
    })
})


export const jobSeekerDeleteApplication = catchAsyncError(async(req, res, next)=>{
    const { role } = req.user;
    if(role === "Employer"){
        return next(
            new ErrorHandler(
                "Employer is not allowed to access this resources!",
                400
            )
        );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if(!application)
    {
        return next(
            new ErrorHandler(
                "Oops, application not found!",404
            )
        );
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully!",
    });
  }
);

export const postApplication = catchAsyncError(async (req, res, next) => {
  console.log("===== APPLICATION REQUEST =====");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("USER:", req.user);

  const { role } = req.user;

  if (role === "Employer") {
    return next(
      new ErrorHandler(
        "Employer is not allowed to access this resources!",
        400
      )
    );
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required", 400));
  }

  const { resume } = req.files;

  console.log("Resume:", resume);
  console.log("Resume Temp Path:", resume.tempFilePath);
  console.log("Resume Mime Type:", resume.mimetype);

  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];

  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type. Please upload PNG, JPG, WEBP or PDF",
        400
      )
    );
  }

  console.log("Cloud Name:", process.env.CLOUDINARY_CLIENT_NAME);
  console.log("Cloud API:", process.env.CLOUDINARY_CLIENT_API);

  let cloudinaryResponse;

  try {
    cloudinaryResponse = await cloudinary.v2.uploader.upload(
      resume.tempFilePath,
      {
        resource_type: "auto",
        
      }
    );

    console.log("Cloudinary Response:", cloudinaryResponse);
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);

    return next(
      new ErrorHandler(
        error.message || "Cloudinary Upload Failed",
        500
      )
    );
  }

  if (!cloudinaryResponse) {
    return next(
      new ErrorHandler("Failed to upload resume.", 500)
    );
  }

  const {
    name,
    email,
    coverLetter,
    phone,
    address,
    jobId,
  } = req.body;

  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const jobDetails = await Job.findById(jobId);

  console.log("Job Details:", jobDetails);

  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };

  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address
  ) {
    return next(
      new ErrorHandler("Please fill all fields!", 400)
    );
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  console.log("Application Created:", application);

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});