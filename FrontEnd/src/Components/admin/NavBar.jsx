import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Chip, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    // Navigate to the login page
    navigate("/");
  };

  return (
    <>
      <nav className="h-[3rem] w-full flex justify-between items-center border-b-[1px] border-b-[#9e9e9e55] px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Foodie</h1>
          <Chip label="Seller" color="error" size="small" className="ml-2" />
        </div>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink to="/admin" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/status" activeClassName="active">
              Status
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" activeClassName="active">
              History
            </NavLink>
          </li>
          <li>
            <IconButton
              color="error"
              size="small"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon />
            </IconButton>
          </li>
        </ul>
      </nav>
    </>
  );
}
