import React from "react";
import Admin from "./Pages/admin/Admin";

import { Routes, Route } from "react-router-dom";

import Home from "./Pages/admin/Home.jsx";
import History from "./Pages/admin/History.jsx";
import Status from "./Pages/admin/Status.jsx";
import Login from "./Pages/auth/login/Login.jsx";
import Register from "./Pages/auth/register/Register.jsx";

export default function App() {
  return (
    <>
      <Admin />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
