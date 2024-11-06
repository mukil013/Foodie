import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import UserRoute from './Routes/UserRoute.js';
import FoodRoute from './Routes/foodRoute.js'; 

dotenv.config();

// Check if MONGO_URL is defined
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not defined in the environment variables.");
  process.exit(1);
}

const MongoDB = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MongoDB);
    console.log("MongoDB Connected");

    // Middleware setup
    app.use(express.json({ limit: '10mb' })); 
    app.use(cors());
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the Express server
const startServer = () => {
  
  // Routes
  app.use('/user', UserRoute);
  app.use('/food', FoodRoute);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Connect to the database and start the server
const init = async () => {
  await connectDB();
  startServer();
};

init();

