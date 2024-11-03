import express from "express";
import { Users } from "../Models/UserModel.js";

const route = express.Router();

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

    
    const newUser = await Users.create(userData);
    return res.status(200).send({ message: "User registered successfully", user: newUser });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: e.message });
  }
});

route.get('/login', async (req, res) => {
  try{
    let userData = {
      email: req.body.email,
      password : req.body.password
    }

    const user = await Users.findOne({email: userData.email, password: userData.password})
    return (user) ? res.status(200).send("Login Successfull") : res.status(400).send("Invalid credentials")  
  }catch(e){
    return res.status(500).send({message: e.message})
  }
})

export default route;
