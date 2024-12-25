import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Bro} from "react-router-dom";

import App from "./App.jsx";
import { StrictMode } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./Pages/admin/Home.jsx";
import History from "./Pages/admin/History.jsx";
import Status from "./Pages/admin/Status.jsx";
import Login from "./Pages/auth/login/Login.jsx";
import Register from "./Pages/auth/register/Register.jsx";
import HomeUser from "./Pages/client/Home.jsx";
import Search from "./Pages/client/Search.jsx";
import Cart from "./Pages/client/Cart.jsx";
import Explore from "./Pages/client/Explore.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Bro>
      <App />
      <Routes>
        <Route path="/admin" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/history" element={<History />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<HomeUser />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Bro>
  </StrictMode>
);
