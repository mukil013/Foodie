import express from "express";
import Cart from "../Models/cartModel.js";
import cartModel from "../Models/cartModel.js";

const router = express.Router();

// Add or update a food item in the cart for a specific user
router.post("/add", async (req, res) => {
  const { foodId, foodName, foodPrice, foodImage, userId, quantity, status } =
    req.body;

  try {
    // Find the cart item by foodId and userId (cart items are unique by foodId for each user)
    let cartItem = await Cart.findOne({ foodId, userId });

    if (cartItem) {
      // Update the existing cart item with new quantity and status
      cartItem.quantity += quantity;
      cartItem.status = status;
      await cartItem.save();
      res.status(200).json({ message: "Cart updated successfully", cartItem });
    } else {
      // Create a new cart item if it does not exist
      cartItem = new Cart({
        foodId,
        foodName,
        foodPrice,
        foodImage,
        userId,
        quantity,
        status,
      });

      await cartItem.save();
      res.status(201).json({ message: "Item added to cart", cartItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

// Retrieve cart items for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all cart items for the user
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving cart items", error });
  }
});

// Remove a food item from the cart for a specific user
router.delete("/remove", async (req, res) => {
  const { foodId, userId } = req.body;

  if (!foodId || !userId) {
    return res.status(400).json({ message: "foodId and userId are required." });
  }

  try {
    // Find the cart item by foodId and userId
    const cartItem = await Cart.findOne({ foodId, userId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Delete the cart item
    await Cart.findByIdAndDelete(cartItem._id);
    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing cart item", error });
  }
});

router.get("/", async (req, res) => {
  try {
    // Wait for the cart items to be fetched
    const cart = await cartModel.find();

    // Send the result as a response
    return res.status(200).json(cart);
  } catch (e) {
    // Return error message if there's an issue
    return res.status(400).send({ message: e.message });
  }
});


export default router;
