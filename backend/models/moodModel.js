const mongoose = require ("mongoose")

const moodSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,},

    text:{type:String, required: true},
     mood: { type: String },                
  emoji: { type: String },
  color: { type: String },
  suggestion: { type: String },
  createdAt: { type: Date, default: Date.now },
    
    },
    
    { timestamps: true } 
)

module.exports = mongoose.model("Mood", moodSchema);