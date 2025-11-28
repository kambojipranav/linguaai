import Lesson from "../models/Lesson.js";
import Learning from "../models/Learning.js";

// Load workspace
export const enterLessonWorkspace = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.json(lesson); // FIXED: send only lesson object
  } catch (err) {
    res.status(500).json({ message: "Server error while loading workspace" });
  }
};

// AI response (placeholder)
export const askAi = async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: "Query required" });

  try {
    const aiResponse = `🤖 (AI Placeholder): "${query}" is a good question — real AI response coming soon.`;

    const saved = await Learning.create({
      userId: req.user.id,
      lessonId: req.params.id,
      question: query,   // FIXED: proper field name
      response: aiResponse,
    });

    res.json(saved); // FIXED: send final object, not nested
  } catch (err) {
    res.status(500).json({ message: "AI error" });
  }
};

// History
export const getLessonHistory = async (req, res) => {
  try {
    const history = await Learning.find({
      userId: req.user.id,
      lessonId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Error loading history" });
  }
};
