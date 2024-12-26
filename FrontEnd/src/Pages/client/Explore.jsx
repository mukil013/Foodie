import React, { useEffect, useState } from "react";
import NavBar from "../../Components/client/NavBar";
import { Food } from "../../api/Api";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Explore() {
  const [foodItems, setFoodItems] = useState([]);
  const allFood = `${Food}/get-food`;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(allFood);
        setFoodItems(response.data);
        sessionStorage.setItem("foodList", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, [allFood]);

  const addToCart = async (foodItem) => {
    const { _id, foodName, foodPrice, foodImage } = foodItem;
    let foodId = _id
    if (!userId) {
      alert("Please login to add items to the cart");
      return;
    }

    const cartItem = {
      foodId,
      foodName,
      foodPrice,
      foodImage,
      userId,
      quantity: 1,
      status: "active",
    };

    try {
      await axios.post("https://foodie-vqll.onrender.com/cart/add", cartItem);

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-4xl font-semibold mb-4">Explore the menu</h1>
        <div className="flex gap-5 flex-wrap">
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <div
                key={item._id}
                className="w-[20vw] p-4 border rounded shadow-md"
              >
                <h3 className="text-xl font-semibold">{item.foodName}</h3>
                <p className="text-gray-700">Price: Rs {item.foodPrice}</p>
                <Link to={`/order/${item._id}`}>
                <img
                    src={item.foodImage || "https://via.placeholder.com/150"}
                    alt={item.foodName}
                    className="h-32 w-full object-contain rounded-md my-2"
                  />
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(item)}
                  className="mt-2"
                >
                  Add to Cart
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading food items...</p>
          )}
        </div>
      </div>
    </>
  );
}
