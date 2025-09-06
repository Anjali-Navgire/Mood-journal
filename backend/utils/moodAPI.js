const moodData = require("./moodData");

async function analyzeMoodAPI(text) {
  const lower = text.toLowerCase();
  let match = moodData.find((m) =>
    m.keyword.some((word) => lower.includes(word))
  );

  if (!match) {
    match = {
      mood: "Neutral",
      emoji: "😐",
      color: "#9ca3af",
      suggestion: "Stay mindful 🌸"
    };
  }

  return match;
}

module.exports = analyzeMoodAPI;

