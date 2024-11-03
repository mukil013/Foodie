import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="h-[3rem] w-full flex justify-around items-center border-b-[1px] border-b-[#9e9e9e55]">
        <div>
          Foodie
        </div>
        <ul className="flex gap-4">
          <li>
            <NavLink activeClassName="active" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/status">Status</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/history">History</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
