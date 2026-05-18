import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import fileUpload from "express-fileupload";
import {dbConnection} from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js"

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin: "https://career-hub-front-end-main.vercel.app",
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.get("/api/v1/job", (req, res) => {
  res.send("Job Route Working");
});

app.get("/api/v1/user", (req, res) => {
  res.send("User Route Working");
});

dbConnection();

app.use(errorMiddleware);

export default app;
