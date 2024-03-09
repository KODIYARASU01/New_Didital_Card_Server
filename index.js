import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
dotenv.config();
import cors from "cors";

import userRoutes from "./Router/user.router.js";
import authRoutes from "./Router/auth.route.js";
//Port number initialize:
let PORT = process.env.PORT || 5000;
//Mongodb conncetion initializing:
let uri = process.env.MONGODB_CONECTION_STRING;
//App Initialize:
let app = express();
//Middlewares:
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//Connection to database :
mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongoose Connected Sucessfully");
    try {
      //Application listening port number
      app.listen(PORT, () => {
        console.log(`Server running ${PORT} port number`);
      });
    } catch (err) {
      console.log("Server is not conected");
    }
  })
  .catch((error) => {
    console.log("Mongoose conncetion failed ", error.message);
  });
//Home route:
app.get("/", (req, res) => {
  res.send("Server is working");
});

//All Routers Middlewares:
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//Create Middleware an functions to handle the error:

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
