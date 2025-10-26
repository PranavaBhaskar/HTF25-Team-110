import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
// Protected Route Wrapper
const ProtectedRoute = () => {
  const user = localStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* 👇 All protected routes grouped here */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
