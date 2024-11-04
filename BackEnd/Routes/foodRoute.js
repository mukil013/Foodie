// Routes/FoodRoute.js
import express from 'express';
import { Food } from '../Models/foodModel.js'; 

const router = express.Router();

// Route to add a food item
router.post('/addFood', async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming data
  try {
    const foodItem = new Food(req.body);
    await foodItem.save();
    res.status(201).json({ foodItem });
  } catch (error) {
    console.error('Error saving food item:', error);
    res.status(400).json({ message: error.message });
  }
});



// Route to get all food items (optional)
router.get('/getFood', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Failed to fetch food items', error });
  }
});

export default router;
