import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/admin/NavBar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from '@mui/material';

export default function Status() {
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const fetchCartDetails = () => {
    axios.get("http://localhost:3000/cart/")  // Updated URL to localhost
      .then(response => {
        setCartDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the cart details:", error);
        setLoading(false);
      });
  };

  const renderCartItems = () => {
    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    return cartDetails.map((item) => (
      <TableRow key={item.orderId}>
        <TableCell>{item.orderId}</TableCell>
        <TableCell>{item.foodId}</TableCell>
        <TableCell>{item.foodName}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>
          <FormControl fullWidth>
            <Select
              value={item.status}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="Out for delivery">Out for delivery</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Cart Details
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Food ID</TableCell>
                <TableCell>Food Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderCartItems()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
