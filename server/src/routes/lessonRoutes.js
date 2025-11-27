import express from "express";
import { getLessons, createLesson, deleteLesson } from "../controllers/lessonController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes below require auth
router.use(authMiddleware);

router.get("/", getLessons);        // GET /api/lessons
router.post("/", createLesson);     // POST /api/lessons
router.delete("/:id", deleteLesson); // DELETE /api/lessons/:id

export default router;
