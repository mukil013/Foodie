import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../../Components/client/NavBar";
import axios from "axios";

export default function Search() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [genAiRes, setGenAiRes] = useState(null);

  useEffect(() => {
    // Fetch food items on component mount
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          "https://foodie-vqll.onrender.com/food/get-food/"
        );
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  useEffect(() => {
    // Filter items based on search term
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

  const genAi = useCallback(async (foodName) => {
    try {
      const response = await axios.get(
        `https://foodie-vqll.onrender.com/genai/${foodName}`
      );
      setGenAiRes(response.data); // Update state only on successful response
    } catch (error) {
      console.error("Error fetching AI insight:", error);
      setGenAiRes(null); // Set back to null on error
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (searchTerm && searchTerm.trim() !== "") {
      timeoutId = setTimeout(() => {
        genAi(searchTerm);
      }, 1000); // Delay for 1 second
    }

    return () => clearTimeout(timeoutId);
  }, [genAi, searchTerm]);

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-4xl font-semibold mb-4">Search</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or description..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Display filtered items */}
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="w-[20vw] p-4 border rounded shadow-md"
            >
              <h3 className="text-xl font-semibold">{item.foodName}</h3>
              <p className="text-gray-700">Price: Rs {item.foodPrice}</p>
              <img
                src={item.foodImage || "https://via.placeholder.com/150"}
                alt={item.foodName}
                className="h-32 w-full object-contain rounded-md my-2"
              />

              {/* Conditionally display AI Insight Section */}
              {genAiRes && (
                <div className="p-2 mt-2 border-t border-gray-200">
                  <p className="text-blue-600 font-semibold">AI Insight</p>
                  <p>{genAiRes}</p>
                </div>
              )}
            </div>
          ))}

          {/* No results message */}
          {filteredItems.length === 0 && searchTerm && (
            <p className="text-gray-500">No items match your search.</p>
          )}
        </div>
      </div>
    </>
  );
}
