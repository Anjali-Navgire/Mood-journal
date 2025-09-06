import React from "react";
import MoodForm from "../components/moodForm";

const MoodPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 animate-gradient-xy flex flex-col items-center py-16">
  <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
    Mood Journal ✨
  </h1>

  <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">
    <MoodForm />
  </div>
</div>

  );
};

export default MoodPage;
