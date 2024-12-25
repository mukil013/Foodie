import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/client/NavBar';
import { Food } from '../../api/Api';
import { Button } from '@mui/material';
import axios from 'axios';

export default function Explore() {
  const [foodItems, setFoodItems] = useState([]); // State to store all food items
  const allFood = `${Food}/get-food`;

  useEffect(() => {
    // Fetch all food items when the component mounts
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(allFood);
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [allFood]);

  const addToCart = (foodItem) => {
    console.log('Added to cart:', foodItem);
    // Additional cart logic can be added here
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
                <img
                  src={item.foodImage || 'https://via.placeholder.com/150'}
                  alt={item.foodName}
                  className="h-32 w-full object-contain rounded-md my-2"
                />
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

