import express from 'express';
import Cart from '../models/Cart.js';  // Importing the Cart model

const router = express.Router();

// Add a food item to the cart for a specific user
router.post('/add', async (req, res) => {
  const { foodId, foodName, foodPrice, foodImage, userId, quantity, status } = req.body;

  try {
    // Check if the food item already exists in the cart
    let cartItem = await Cart.findOne({ foodId });

    if (cartItem) {
      // Update the cart item if the user already exists
      const userInCart = cartItem.users.find(user => user.userId.toString() === userId);

      if (userInCart) {
        // Update the existing user's quantity and status
        userInCart.quantity += quantity;
        userInCart.status = status;
      } else {
        // Add the user to the users array if they don't already exist
        cartItem.users.push({ userId, quantity, status });
      }

      await cartItem.save();
      res.status(200).json({ message: 'Cart updated successfully', cartItem });
    } else {
      // Create a new cart item if it doesn't exist
      cartItem = new Cart({
        foodId,
        foodName,
        foodPrice,
        foodImage,
        users: [{ userId, quantity, status }]
      });
      await cartItem.save();
      res.status(201).json({ message: 'Item added to cart', cartItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});

// Retrieve cart items for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ 'users.userId': userId });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
});

// Remove a food item from the cart for a specific user
router.delete('/remove', async (req, res) => {
  const { foodId, userId } = req.body;

  try {
    const cartItem = await Cart.findOne({ foodId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the specific user from the cart item's users array
    cartItem.users = cartItem.users.filter(user => user.userId.toString() !== userId);

    // If no users remain for this food item, delete the cart item entirely
    if (cartItem.users.length === 0) {
      await Cart.findByIdAndDelete(cartItem._id);
    } else {
      await cartItem.save();
    }

    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing cart item', error });
  }
});

export default router;
