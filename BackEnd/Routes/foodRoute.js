// Routes/FoodRoute.js
import express, { json } from 'express';
import { Food } from '../Models/foodModel.js'; 

const router = express.Router();

// Route to add a food item
router.post('/add-food', async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming data
  try {
    const foodItem = new Food(req.body);
    await foodItem.save();
    res.status(201).json({ foodItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Route to get all food items (optional)
router.get('/get-food', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch food items', error });
  }
});

export default router;
