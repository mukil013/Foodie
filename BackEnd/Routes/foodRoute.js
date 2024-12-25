// Routes/FoodRoute.js
import express, { json } from "express";
import { Food } from "../Models/foodModel.js";

const router = express.Router();

// Route to add a food item
router.post("/add-food", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const foodItem = new Food(req.body);
    await foodItem.save();
    res.status(201).json({ foodItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/get-food/:sellerId', async (req, res) => {
  const { sellerId } = req.params;
  try {
    const foodForSeller = await Food.find({ sellerId });
    res.status(200).send(foodForSeller);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Route to get all food items
router.get("/get-food", async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch food items", error });
  }
});

router.delete('/delete-food/:foodId', async(req,res) => {
  try{
    const foodId = req.params
    await Food.deleteOne(foodId)
    res.status(200).send("Deleted Successfully!!!")
  }catch (error){
    res.status(500).send({ message: "Failed to delete food items", error });
  }
})

export default router;
