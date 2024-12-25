import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className="h-[3rem] w-full flex justify-between items-center border-b-[1px] border-b-[#9e9e9e55] px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Foodie</h1>
        </div>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink to="/user" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/explore" activeClassName="active">Explore</NavLink>
          </li>
          <li>
            <NavLink to="/search" activeClassName="active">Search</NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="active">My Cart</NavLink>
          </li>
          <li>
            <IconButton color="error" size="small" onClick={handleLogout} title="Logout" >
              <LogoutIcon />
            </IconButton>
          </li>
        </ul>
      </nav>
    </>
  );
}
