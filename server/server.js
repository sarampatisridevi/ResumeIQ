
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import analyzeRoutes from "./routes/analyze.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API working"));
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));