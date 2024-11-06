import React from "react";
import { NavLink } from "react-router-dom";
import { Chip } from "@mui/material";

export default function NavBar() {
  return (
    <>
      <nav className="h-[3rem] w-full flex justify-around items-center border-b-[1px] border-b-[#9e9e9e55]">
        <div className="flex">
          <h1 className="text-2xl font-bold">Foodie</h1>
          <Chip label="Seller" color="error" size="small"/>
        </div>
        <ul className="flex gap-4">
          <li>
            <NavLink to="/admin" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/status" activeClassName="active">Status</NavLink>
          </li>
          <li>
            <NavLink to="/history" activeClassName="active">History</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
