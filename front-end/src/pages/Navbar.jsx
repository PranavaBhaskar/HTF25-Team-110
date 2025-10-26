import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between sticky top-0 z-50">
      {/* Logo / Brand */}
      <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
        MyApp<span className="text-pink-500">.</span>
      </h1>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `text-gray-700 font-medium hover:text-indigo-600 transition duration-300 ${
              isActive ? "text-indigo-600 underline" : ""
            }`
          }
        >
          Home
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
