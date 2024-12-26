import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/client/NavBar';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId")); 

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) {
        alert("Please login to view your cart.");
        return;
      }

      try {
        const response = await axios.get(`https://foodie-vqll.onrender.com/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveFromCart = async (foodId) => {
    try {
      await axios.delete(`https://foodie-vqll.onrender.com/cart/remove`, {
        data: { userId, foodId },
      });
      setCartItems(cartItems.filter(item => item.foodId !== foodId)); 
      alert("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4">My Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.foodId} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <img
                    src={item.foodImage || "https://via.placeholder.com/150"}
                    alt={item.foodName}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="font-semibold">{item.foodName}</h2>
                    <p>Price: Rs {item.foodPrice}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.foodId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
