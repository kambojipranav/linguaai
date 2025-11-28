import express from "express";
import { getLessons, createLesson, deleteLesson } from "../controllers/lessonController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { enterLessonWorkspace, askAi, getLessonHistory } from "../controllers/lessonAiController.js";

const router = express.Router();

// Lessons CRUD
router.get("/", authMiddleware, getLessons);
router.post("/", authMiddleware, createLesson);
router.delete("/:id", authMiddleware, deleteLesson);

// Workspace + AI routes
router.get("/:id/workspace", authMiddleware, enterLessonWorkspace);
router.post("/:id/chat", authMiddleware, askAi);
router.get("/:id/history", authMiddleware, getLessonHistory);

export default router;
