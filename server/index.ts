import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleQwenText } from "./routes/qwen-text";
import { handleQwenImage } from "./routes/qwen-image";
import { handleQwenVideo } from "./routes/qwen-video";
import { handleQwenAudio } from "./routes/qwen-audio";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/generate-text", handleQwenText);
  app.post("/api/generate-image", handleQwenImage);
  app.post("/api/generate-video", handleQwenVideo);
  app.post("/api/generate-audio", handleQwenAudio);

  return app;
}
