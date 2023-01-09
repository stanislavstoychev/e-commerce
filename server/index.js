import express from "express";
import cors from "cors";
// or  const express = require("express");
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from "./routes/product.js";
//execute express, dotenv
const app = express();
dotenv.config();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
//middleware - adding package for handling files uploads
// bodyParse is used previously!!
// app.use(bodyParser.json());

//db connection
mongoose.set('strictQuery', true)
mongoose.connect(
  process.env.MONGO_URI,
    { useNewUrlParser: true }, 
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//middleware
// app.use((req, res, next) => { 
//   console.log("This is my middleware");
//   next();
// });

//router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);



const port = process.env.PORT;
app.listen(port,  () => {
  console.log("Console log PORT", port);
});

