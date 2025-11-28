import mongoose from "mongoose";

const learningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  query: String,
  response: String,
  source: { type: String, default: "ai" }, // ai | web | user-note
}, { timestamps: true });

export default mongoose.model("Learning", learningSchema);
