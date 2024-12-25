import express from "express";
import Cart from "../Models/cartModel.js";
import cartModel from "../Models/cartModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { foodId, foodName, foodPrice, foodImage, userId, quantity, status } = req.body;

  try {
    let cartItem = await Cart.findOne({ foodId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.status = status;
      await cartItem.save();
      res.status(200).json({ message: "Cart updated successfully", cartItem });
    } else {
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

router.put("/update", async (req, res) => {
  const { foodId, foodName, foodPrice, foodImage, userId, quantity, status } =
    req.body;

  try {
    let cartItem = await Cart.findOne({ foodId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.status = status;
      await cartItem.save();
      res.status(200).json({ message: "Cart updated successfully", cartItem });
    } else {
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

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving cart items", error });
  }
});

router.delete("/remove", async (req, res) => {
  const { foodId, userId } = req.body;

  if (!foodId || !userId) {
    return res.status(400).json({ message: "foodId and userId are required." });
  }

  try {
    const cartItem = await Cart.findOne({ foodId, userId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await Cart.findByIdAndDelete(cartItem._id);
    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing cart item", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await cartModel.find();

    return res.status(200).json(cart);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});


export default router;
