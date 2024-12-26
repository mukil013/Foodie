import React, { useEffect, useState } from "react";
import NavBar from "../../Components/client/NavBar";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Search() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [aiInsights, setAiInsights] = useState({});
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://foodie-vqll.onrender.com/food/get-food/"
        );
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = foodItems.filter(
        (item) =>
          item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.foodDescription &&
            item.foodDescription
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, foodItems]);

  const toggleAiInsight = async (foodName, foodId) => {
    if (aiInsights[foodId]) {
      setAiInsights((prev) => {
        const updatedInsights = { ...prev };
        delete updatedInsights[foodId];
        return updatedInsights;
      });
    } else {
      try {
        setAiInsights((prev) => ({ ...prev, [foodId]: "Loading..." }));
        const response = await axios.get(
          `https://foodie-vqll.onrender.com/genai/${foodName}`
        );
        setAiInsights((prev) => ({
          ...prev,
          [foodId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching AI insight:", error);
        setAiInsights((prev) => ({
          ...prev,
          [foodId]: "Unable to fetch AI insight",
        }));
      }
    }
  };

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
        <h1 className="text-4xl font-semibold mb-4">Search</h1>
        <input
          type="text"
          placeholder="Search by name of the food..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-5 flex-wrap">
          {loading ? (
            <p className="text-gray-500">Loading food items...</p>
          ) : (
            filteredItems.map((item) => (
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
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(item)}
                    className="mt-2 text-left"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => toggleAiInsight(item.foodName, item._id)}
                    className="mt-2 text-left"
                  >
                    {aiInsights[item._id]
                      ? "Hide AI Insight"
                      : "Get AI Insight"}
                  </Button>
                </div>

                {aiInsights[item._id] && (
                  <div className="p-2 mt-2 border-t border-gray-200">
                    <p className="text-blue-600 font-semibold">AI Insight</p>
                    <p className="text-justify p-2 rounded-lg mt-4">
                      {aiInsights[item._id]}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}

          {filteredItems.length === 0 && searchTerm && !loading && (
            <p className="text-gray-500">No items match your search.</p>
          )}
        </div>
      </div>
    </>
  );
}
