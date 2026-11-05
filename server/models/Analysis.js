
import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: String,
    jobDescription: String,
    score: Number,
    strengths: [String],
    missingSkills: [String],
    suggestions: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);