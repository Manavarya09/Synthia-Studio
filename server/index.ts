import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleQwenText } from "./routes/qwen-text";
import { handleQwenImage } from "./routes/qwen-image";
import { handleQwenVideo } from "./routes/qwen-video";
import { handleQwenImageEdit } from "./routes/qwen-image-edit";
import notesToSlidesRouter from "./routes/notes-to-slides";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/generate-text", handleQwenText);
  app.post("/api/generate-image", handleQwenImage);
  app.post("/api/generate-video", handleQwenVideo);
  app.post("/api/edit-image", handleQwenImageEdit);
  app.use("/api", notesToSlidesRouter);

  return app;
}
