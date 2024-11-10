import React, { useEffect, useState } from "react";
import NavBar from "../../Components/admin/NavBar";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function Home() {
  const [hotelImage, setHotelImage] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [open, setOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  const placeholderImage = "https://via.placeholder.com/150";

  useEffect(() => {
    const storedHotelImage = sessionStorage.getItem("hotelImage");
    const storedHotelName = sessionStorage.getItem("hotelName");

    if (storedHotelImage) {
      setHotelImage(storedHotelImage);
    }
    if (storedHotelName) {
      setHotelName(storedHotelName);
    }

    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const sellerId = sessionStorage.getItem("userId");
      const response = await axios.get(
        `https://foodie-vqll.onrender.com/food/get-food/${sellerId}`
      );
      console.log(response.data);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFoodName("");
    setFoodPrice("");
    setFoodDescription("");
    setFoodImage("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFoodItem = async () => {
    if (!foodName || !foodPrice || !foodImage || !foodDescription) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const sellerId = sessionStorage.getItem("userId");
    const newFoodItem = {
      foodName,
      foodImage: foodImage || placeholderImage,
      foodPrice: foodPrice,
      foodDescription: foodDescription,
      sellerId: sellerId,
    };

    try {
      const response = await axios.post(
        "https://foodie-vqll.onrender.com/food/add-food",
        newFoodItem
      );
      console.log("Food item added:", response.data);
      setFoodItems([...foodItems, response.data.foodItem]);
      handleClose();
    } catch (error) {
      console.error("Error adding food item:", error);
      alert(`Failed to add food item: ${error.message}`);
    }
  };

  return (
    <div className="h-dvh overflow-hidden">
      <NavBar />
      <div className="flex w-dvh">
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col items-start w-1/2 h-dvh border-r-[1px] border-[#9e9e9e55] p-4">
            <h1 className="text-3xl font-semibold mb-4">
              {hotelName.toUpperCase() || "Hotel Name"}
            </h1>
            {hotelImage ? (
              <img
                src={hotelImage}
                alt={hotelName || "Hotel"}
                className="h-[50vh] w-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">No hotel image available</p>
            )}
          </div>
          <div className="absolute bottom-5 right-5">
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add food
            </Button>
          </div>

          {/* Food Items Grid */}
          <div className="flex flex-wrap content-start gap-4 p-4 h-full w-full">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-lg h-fit w-[15rem]"
              >
                <img
                  src={item.foodImage || placeholderImage}
                  alt={item.foodName}
                  className="h-32 w-full object-contain rounded-md mb-2"
                />
                <h2 className="font-bold text-lg">{item.foodName}</h2>
                <p className="text-gray-500">Rs {item.foodPrice}</p>
                <p className="text-gray-700">{item.foodDescription}</p>
              </div>
            ))}
          </div>

          {/* Dialog Form for Adding Food Items */}
          <Dialog
            open={open}
            onClose={handleClose}
            className="backdrop-blur-md"
          >
            <DialogTitle>Add Food Item</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Food Name"
                type="text"
                fullWidth
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Food Price"
                type="number"
                fullWidth
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Food Description"
                type="text"
                fullWidth
                multiline
                rows={3}
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
              />
              <label className="block mt-4">
                Food Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block mt-1"
                />
              </label>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddFoodItem} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
