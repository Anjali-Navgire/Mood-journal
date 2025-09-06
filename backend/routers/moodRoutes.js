const express = require("express");
const router = express.Router();
const { addMood, getMoods ,deleteMood } = require("../controllers/moodController");
const authMiddleware = require("../middlewares/authMiddleware");
const verifyToken = require("../middlewares/authMiddleware");


router.post("/add", authMiddleware, addMood);
router.get("/", authMiddleware, getMoods);
router.delete("/delete/:id", authMiddleware, deleteMood);

module.exports = router;
