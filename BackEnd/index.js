import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv"

dotenv.config()
    
const MongoDB = process.env.MONGO_URL

try {
  await mongoose.connect(MongoDB);
  console.log("MongoDB Connected");

  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Working");
  });
  app.listen(3000, () => {
    console.log("Listening");
  });
} catch (e) {
  console.log("Error" + e);
}
