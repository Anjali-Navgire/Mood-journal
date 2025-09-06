import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoodForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a mood");
      return;
    }

    try {
      const res = await axios.post(
        "https://mood-journal-npfg.onrender.com/api/moods/add",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(res.data);
      setText("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to analyze mood");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-2xl shadow-xl mt-10">
      
      <button
        onClick={() => navigate("/home")}
        className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="How are you feeling today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-600 focus:outline-none focus:border-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition"
        >
          Analyze Mood
        </button>
      </form>

      {result && (
        <div
          className="mt-6 p-4 rounded-xl shadow-lg text-center"
          style={{ backgroundColor: result.color }}
        >
          <div className="text-4xl">{result.emoji}</div>
          <h3 className="text-lg font-bold mt-2">{result.mood}</h3>
          <p className="mt-1">{result.suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default MoodForm;
