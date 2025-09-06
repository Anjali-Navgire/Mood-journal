import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleMoodClick = () => {
    navigate("/mood");
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("https://mood-journal-npfg.onrender.com/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 animate-gradient-xy">
      <Navbar />

      <div className="absolute top-6 right-6 flex gap-4">

      </div>
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-wide animate-fade-in">
          Mood Journal ✨
        </h1>
        <p className="text-gray-200 mt-3 text-lg animate-fade-in">
          Track your moods, reflect, and grow 🌙
        </p>

        <div className="flex flex-col items-center w-full max-w-lg space-y-6">

          {/* Welcome Card */}
          {profile && (
            <div className="w-full bg-neutral-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 animate-fade-in">
              <p className="text-xl text-white">
                Welcome back,{" "}
                <span className="font-semibold text-pink-400">{profile.name}</span>! 💜
              </p>
              <p className="text-gray-300 mt-2 text-sm">
                Hope you’re having a great day! Track your moods and reflect 🌙
              </p>
            </div>
          )}


          <div className="w-full bg-neutral-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 animate-fade-in-up">
            <h3 className="text-lg font-bold text-white mb-3">
              Your Mood Journal 📖
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Click below to record your mood, get suggestions, colors, and emojis 🌟
            </p>
            <button
              onClick={handleMoodClick}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Open Mood Journal
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
