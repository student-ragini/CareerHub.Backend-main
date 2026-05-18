# CareerHub Backend

CareerHub Backend is a REST API built using Node.js, Express.js and MongoDB for the CareerHub MERN Stack Job Portal application.

## Features

- User Authentication with JWT
- Role Based Authorization
- Employer and Job Seeker Accounts
- Post Jobs
- Update/Delete Jobs
- Apply for Jobs
- Resume Upload using Cloudinary
- Manage Applications
- Error Handling Middleware
- Secure Cookies Authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cloudinary
- Cookie Parser
- Express FileUpload

## Backend Deployment

Deployed on Render

## API Routes

- /api/v1/user
- /api/v1/job
- /api/v1/application

## Installation

```bash
npm install
npm run dev

## Environment Variables

Create a .env file and add:

Environment

PORT=5000
MONGO_URI=mongodb_url
JWT_SECRET_KEY=secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLIENT_NAME=cloudinary_name
CLOUDINARY_CLIENT_API=cloudinary_api
CLOUDINARY_CLIENT_SECRET=cloudinary_secret
FRONTEND_URL=frontend_url


## Author

Ragini Kumari