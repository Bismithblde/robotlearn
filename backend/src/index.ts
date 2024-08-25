import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateLesson } from "./ai/lessonai";
// Create an instance of an Express application
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API!" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Sozmething broke!");
});

const PORT = process.env.PORT || 3000;

app.post("/api/generate-lesson", async (req: Request, res: Response) => {
  const { topic, gradeLevel } = req.body;
  const lesson = await generateLesson(topic, gradeLevel);
  res.json({ lesson });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
