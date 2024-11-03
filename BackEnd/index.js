import mongoose from "mongoose";
import express from "express";
<<<<<<< HEAD
import dotenv from "dotenv"

dotenv.config()
    
const MongoDB = process.env.MONGO_URL

try {
  await mongoose.connect(MongoDB);
=======

try {
  await mongoose.connect(
    "mongodb+srv://root:root@foodie.jcpc2.mongodb.net/foodie?retryWrites=true&w=majority&appName=foodie"
  );
>>>>>>> 787333f245aa89d83f370b911ba49da7e1e8ed61
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
