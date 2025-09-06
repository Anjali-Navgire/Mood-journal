const analyzeMoodAPI = require("../utils/moodAPI");
const Mood = require("../models/moodModel");

// Add Mood
exports.addMood = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Mood text is required" });

    const analysis = await analyzeMoodAPI(text);
    console.log("ANALYSIS:", analysis);

    const newMood = await Mood.create({
      user: req.user.id,
      text,
      mood: analysis.mood,
      emoji: analysis.emoji,
      color: analysis.color,
      suggestion: analysis.suggestion,
    });

    res.status(201).json(newMood);
  } catch (err) {
    console.error("ADD MOOD ERROR:", err);
    res.status(500).json({ message: "Failed to add mood", error: err.message });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ moods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get moods", error: err.message });
  }
};

// delete
exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }
    res.json({ message: "Mood deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete mood", error: err.message });
  }
};
