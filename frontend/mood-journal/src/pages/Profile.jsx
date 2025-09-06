import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [moods, setMoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("https://mood-journal-npfg.onrender.com/api/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));

        axios
            .get("https://mood-journal-npfg.onrender.com/api/moods", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setMoods(res.data.moods))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://mood-journal-npfg.onrender.com/api/moods/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMoods(moods.filter((m) => m._id !== id));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 animate-gradient-xy py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-10">

                <div className="bg-neutral-900/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-400/30">
                    <button
                        onClick={() => navigate("/home")}
                        className="mb-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
                    >
                        ← Back
                    </button>

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 drop-shadow-lg">
                            🌟 Welcome to Your Space 🌟
                        </h1>
                        <p className="text-gray-300 mt-2">
                            “Your moods tell your story. Keep writing it beautifully ✨”
                        </p>
                    </div>


                    {user && (
                        <div className="bg-gradient-to-r from-purple-800/70 to-pink-800/70 p-5 rounded-xl shadow-md border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-3">👤 Profile</h2>
                            <p className="text-lg text-gray-200">
                                <span className="font-semibold text-pink-400">Name:</span>{" "}
                                {user.name}
                            </p>
                        </div>
                    )}
                </div>

                {/* Mood History */}
                <div className="bg-neutral-900/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-400/30">
                    <h1 className="text-2xl font-bold text-white text-center mb-4">
                        🌙 Your Mood History
                    </h1>
                    <p className="text-center text-gray-300 mb-6 italic">
                        “Reflect on your past moods — they guide your tomorrow 💜”
                    </p>

                    <div className="space-y-4">
                        {moods.length > 0 ? (
                            moods.map((mood) => (
                                <div
                                    key={mood._id}
                                    className="p-4 rounded-xl shadow-md flex justify-between items-center bg-gray-800/80 border border-purple-500/30"
                                >
                                    <div>
                                        <div className="text-2xl">{mood.emoji}</div>
                                        <h3 className="text-lg font-bold text-white">{mood.mood}</h3>
                                        <p className="text-gray-300">{mood.suggestion}</p>
                                        <small className="block text-gray-400">
                                            {new Date(mood.createdAt).toLocaleString()}
                                        </small>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(mood._id)}
                                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">
                                No moods yet. Start journaling today and track your journey! ✨
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
