import Lesson from "../models/Lesson.js";

export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lessons" });
  }
};

export const createLesson = async (req, res) => {
  const { title, language, level, description } = req.body;

  if (!title || !language) {
    return res.status(400).json({ message: "Title and language are required" });
  }

  try {
    const lesson = await Lesson.create({
      userId: req.user.id,
      title,
      language,
      level: level || "Beginner",
      description: description || ""
    });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Failed to create lesson" });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Lesson.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson deleted", id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete lesson" });
  }
};
