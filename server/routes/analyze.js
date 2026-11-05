import { Router } from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import auth from "../middleware/auth.js";
import Analysis from "../models/Analysis.js";
import { analyzeResume } from "../services/ai.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Create analysis
router.post("/", auth, upload.single("resume"), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!req.file || !jobDescription)
      return res.status(400).json({ message: "Resume PDF and job description required" });

    const parser = new PDFParse({ data: req.file.buffer });
    const pdfData = await parser.getText();
    await parser.destroy();
    const resumeText = pdfData.text.slice(0, 8000);

    const result = await analyzeResume(resumeText, jobDescription);

    const saved = await Analysis.create({
      userId: req.userId,
      fileName: req.file.originalname,
      jobDescription,
      score: result.score,
      strengths: result.strengths,
      missingSkills: result.missingSkills,
      suggestions: result.suggestions,
    });
    res.json(saved);
  } catch (e) {
    res.status(500).json({ message: "Analysis failed: " + e.message });
  }
});

// History
router.get("/", auth, async (req, res) => {
  const list = await Analysis.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(list);
});

export default router;