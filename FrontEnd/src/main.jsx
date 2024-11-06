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
      </Routes>
    </Bro>
  </StrictMode>
);
