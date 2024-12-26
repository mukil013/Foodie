import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/client/NavBar";
import { Button } from "@mui/material";

export default function FoodExpanded() {
  const { foodId } = useParams(); // Retrieve foodId from URL parameters
  const [food, setFood] = useState(null); // State to store the selected food item

  useEffect(() => {
    const foodList = JSON.parse(sessionStorage.getItem("foodList")) || []; // Retrieve food list from sessionStorage

    const matchedFood = foodList.find((element) => element._id === foodId); // Find the specific food item
    setFood(matchedFood); // Update state with the matched food item
  }, [foodId]); // Run effect when foodId changes

  if (!food) {
    return (
      <>
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Food Details</h1>
          <p className="text-gray-500">Loading or food not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-3xl font-semibold my-6">{food.foodName}</h1>
        <div className="w-full h-[50vh] bg-gray-300 rounded-lg p-4">
          <img
            src={food.foodImage || "https://via.placeholder.com/150"}
            alt={food.foodName}
            className="w-full h-full object-contain"
          />
        </div>
        <hr/>
        <p className="text-4xl font-bold my-6">Price: ₹{food.foodPrice}/-</p>
        <p className="text-gray-700"><b>Description:</b> {food.foodDescription}</p>
        <div className="mt-4">
          <Button color="success" variant="contained">Buy</Button>
        </div>
      </div>

    </>
  );
}
