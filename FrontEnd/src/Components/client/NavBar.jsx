import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Bar } from "react-chartjs-2"; // Import Bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"; // Chart.js modules

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to control the popup dialog

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleOpenDialog = () => {
    setOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
  };

  // Sample data for the chart
  const chartData = {
    labels: ["Carbohydrates", "Proteins", "Fats", "Vitamins", "Minerals"],
    datasets: [
      {
        label: "Recommended Intake (g)",
        data: [250, 60, 70, 15, 5], // Sample recommended intake values
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Today's Intake (g)",
        data: [200, 55, 80, 10, 4], // Sample actual intake values
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <nav className="h-[3rem] w-full flex justify-between items-center border-b-[1px] border-b-[#9e9e9e55] px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={handleOpenDialog}>
            Foodie
          </h1>
        </div>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink to="/user" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" activeClassName="active">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" activeClassName="active">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="active">
              My Cart
            </NavLink>
          </li>
          <li>
            <IconButton color="error" size="small" onClick={handleLogout} title="Logout">
              <LogoutIcon />
            </IconButton>
          </li>
        </ul>
      </nav>

      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="foodie-dialog-title">
        <DialogTitle id="foodie-dialog-title">Your AI Personal Assistant</DialogTitle>
        <DialogContent>
          <p className="mb-4">
            Here's a quick look at a normal human's daily calorie progress compared to your intake:
          </p>
          <div style={{ width: "100%", height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
