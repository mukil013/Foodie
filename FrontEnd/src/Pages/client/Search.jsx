import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/client/NavBar';
import axios from 'axios';

export default function Search() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch food items on component mount
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("https://foodie-vqll.onrender.com/food/get-food/");
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
      const filtered = foodItems.filter(item =>
        item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.foodDescription && item.foodDescription.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, foodItems]);

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
            <div key={item._id} className="w-[20vw] p-4 border rounded shadow-md">
              <h3 className="text-xl font-semibold">{item.foodName}</h3>
              <p className="text-gray-700">Price: Rs {item.foodPrice}</p>
              <img
                src={item.foodImage || "https://via.placeholder.com/150"}
                alt={item.foodName}
                className="h-32 w-full object-contain rounded-md my-2"
              />

              {/* AI Insight Section */}
              <div className="p-2 mt-2 border-t border-gray-200">
                <p className="text-blue-600 font-semibold">AI Insight</p>
                <p>{`Here's an AI insight about ${item.foodName}`}</p>
              </div>
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
