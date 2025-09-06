import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav
      className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 
      px-6 py-4 flex items-center justify-between shadow-md"
    >
 
      <h1
        className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md cursor-pointer"
        onClick={() => navigate("/")}
      >
        Your Daily Vibes 🌙
      </h1>

      {token ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={handleProfile}
            className="px-5 py-2 rounded-xl bg-white/20 text-white font-semibold 
            shadow-lg hover:bg-white/30 hover:shadow-indigo-400/50 
            transition-all duration-300"
          >
            👤 Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-white/20 text-white font-semibold 
            shadow-lg hover:bg-white/30 hover:shadow-pink-500/50 
            transition-all duration-300"
          >
            🚪 Logout
          </button>
        </div>
      ) : (
        <div className="space-x-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl bg-white/20 text-white font-semibold shadow-md hover:bg-white/30"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-xl bg-white/20 text-white font-semibold shadow-md hover:bg-white/30"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
