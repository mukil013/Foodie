import express from "express";
import bcrypt from "bcrypt"; 
import { Users } from "../Models/UserModel.js";

const route = express.Router();


const saltRounds = 10;

route.post('/register', async (req, res) => {
  try {
    
    let userData = {
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      profilePic: req.body.profilePic,
      isSeller: req.body.isSeller
    };

    
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

route.post('/login', async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Send necessary user details in the response
    res.send({
      message: 'Login successful',
      userId: user._id, 
      isSeller: user.isSeller,
      userName: user.userName,
      userEmail: user.email,
      profilePic: user.profilePic,
      hotelName: user.hotelName,
      hotelImage: user.hotelImg
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default route;
