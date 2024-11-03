import express from "express";
import bcrypt from "bcrypt"; // Import bcrypt
import { Users } from "../Models/UserModel.js";

const route = express.Router();

// Define a salt rounds value
const saltRounds = 10;

route.post('/register', async (req, res) => {
  try {
    // Basic user details
    let userData = {
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      profilePic: req.body.profilePic,
      isSeller: req.body.isSeller
    };

    // Add seller-specific fields if isSeller is true
    if (req.body.isSeller) {
      userData = {
        ...userData,
        hotelName: req.body.hotelName,
        hotelAddress: req.body.hotelAddress,
        hotelContactNumber: req.body.hotelContactNumber,
        hotelImg: req.body.hotelImg
      };
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword; // Replace plain password with hashed password

    const newUser = await Users.create(userData);
    return res.status(200).send({ message: "User registered successfully", user: newUser });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: e.message });
  }
});

route.post('/login', async (req, res) => { // Change GET to POST for login
  try {
    let userData = {
      email: req.body.email,
      password: req.body.password
    };

    const user = await Users.findOne({ email: userData.email });
    
    if (user) {
      // Compare the hashed password with the plain text password
      const match = await bcrypt.compare(userData.password, user.password);
      if (match) {
        return res.status(200).send("Login Successful");
      } else {
        return res.status(400).send("Invalid credentials");
      }
    } else {
      return res.status(400).send("Invalid credentials");
    }
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

export default route;
