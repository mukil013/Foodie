import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./Routes/UserRoute.js";
import FoodRoute from "./Routes/foodRoute.js";
import CartRoute from "./Routes/cartRoute.js";
import GenAi from "./Routes/GenAI.js";

dotenv.config();

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not defined in the environment variables.");
  process.exit(1);
}

const MongoDB = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
const app = express();


const connectDB = async () => {
  try {
    await mongoose.connect(MongoDB);
    console.log("MongoDB Connected");

    app.use(express.json({ limit: "10mb" }));
    app.use(cors());
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const startServer = () => {
  
  app.use("/user", UserRoute);
  app.use("/food", FoodRoute);
  app.use("/cart", CartRoute);
  app.use("/genai", GenAi);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const init = async () => {
  await connectDB();
  startServer();
};

init();
