const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:[ "https://mood-journal-npfg.onrender.com","https://mood-journal-frontend.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

//For testing 
app.get("/test", (req, res) => {
  res.json({ message: "GET works fine ✅" });
});

app.get("/", (req, res) => {
  res.send("Mood Journal Server is running");
});

const authRoutes = require('./routers/authRoutes');
const userRoute = require('./routers/userRoute');
const authMiddleware = require('./middlewares/authMiddleware');
const moodRoutes = require('./routers/moodRoutes')


app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoute);
app.use('/api/moods', moodRoutes)

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`✅ Server is running on https://mood-journal-npfg.onrender.com`);
});
