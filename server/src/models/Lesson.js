import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    language: { type: String, required: true },
    level: { type: String, default: "Beginner" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
