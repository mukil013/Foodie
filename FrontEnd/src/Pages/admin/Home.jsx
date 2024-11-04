import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/admin/NavBar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const [hotelImage, setHotelImage] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [open, setOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodImage, setFoodImage] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodItems, setFoodItems] = useState([]);

  const placeholderImage = 'https://via.placeholder.com/150';

  useEffect(() => {
    const storedHotelImage = localStorage.getItem('hotelImage');
    const storedHotelName = localStorage.getItem('hotelName');
    
    if (storedHotelImage) {
      setHotelImage(storedHotelImage);
    }
    if (storedHotelName) {
      setHotelName(storedHotelName);
    }

    // Fetch existing food items when the component mounts
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('https://localhost:3000/food/getFood');
      setFoodItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset fields when closing the dialog
    setFoodName('');
    setFoodPrice('');
    setFoodImage('');
    setFoodDescription('');
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
    // Validate input fields
    if (!foodName || !foodPrice || !foodDescription || !foodImage) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    const sellerId = localStorage.getItem('userId');
    const newFoodItem = {
        foodName,
        foodDescription,
        foodImage: foodImage || placeholderImage,
        foodPrice: foodPrice, 
        sellerId: sellerId,
    };

    try {
        const response = await axios.post('https://localhost:3000/food/addFood', newFoodItem);
        console.log('Food item added:', response.data);
        setFoodItems([...foodItems, response.data.foodItem]); // Update food items list
        handleClose();
    } catch (error) {
        console.error('Error adding food item:', error);
        alert(`Failed to add food item: ${error.message}`);
    }
};


  return (
    <>
      <NavBar />
      <div className='flex w-dvh'>
        <div className="flex-1 flex justify-between mt-8 p-4">
          <div className="flex flex-col items-start w-1/2 h-dvh border-r-[1px] border-[#9e9e9e55]">
            <h1 className="text-3xl font-bold mb-4">{hotelName.toUpperCase() || 'Hotel Name'}</h1>
            {hotelImage ? (
              <img 
                src={hotelImage} 
                alt={hotelName || 'Hotel'} 
                className="h-[50vh] object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">No hotel image available</p>
            )}
          </div>
          <div className='flex-1 p-4 '>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleOpen} 
              className="self-start mt-4 mr-4"
            >
              Add
            </Button>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-12">
            {foodItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-lg">
                <img src={item.foodImage || placeholderImage} alt={item.foodName} className="h-32 w-full object-cover rounded-md mb-2" />
                <h2 className="font-bold text-lg">{item.foodName}</h2>
                <p className="text-gray-500">${item.foodPrice}</p>
                <p className="mt-1 text-sm">{item.foodDescription}</p>
              </div>
            ))}
          </div>

          {/* Dialog Form for Adding Food Items */}
          <Dialog open={open} onClose={handleClose} className="backdrop-blur-md">
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
              <label className="block mt-4">Food Image
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="block mt-1"
                />
              </label>
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
    </>
  );
}
