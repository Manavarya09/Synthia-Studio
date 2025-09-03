import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const DEFAULT_BASE_URL = "https://dashscope-intl.aliyuncs.com/api/v1";
const GENERATION_PATH = "/services/aigc/text-generation/generation";

router.post("/notes-to-slides", async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
      return;
    }

    const { notes, slideStyle, voiceStyle, subject } = req.body;
    if (!notes || typeof notes !== "string") {
      res.status(400).json({ error: "Missing required field: notes" });
      return;
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const url = `${baseUrl}${GENERATION_PATH}`;

    const userContent = `Convert these notes into a presentation with slides.\nNotes: ${notes}\nSubject: ${subject}\nSlide Style: ${slideStyle}\nVoice Style: ${voiceStyle}\nFormat: Plain text with clear slide separation and a summary at the end.`;

    const body = {
      model: "qwen-max",
      input: {
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Convert notes into a structured presentation with slides, summary, and suggested visuals.",
          },
          { role: "user", content: userContent },
        ],
      },
      parameters: {
        result_format: "message",
      },
    } as const;

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      validateStatus: () => true // Always resolve, so we can inspect error response
    });

    if (response.status !== 200) {
      const text = response.data?.error || response.statusText;
      return res.status(response.status).json({ error: `DashScope error: ${text}` });
    }

    const data = response.data;
    // Expected shape (message format): data.output.choices[0].message.content
    const content: string | undefined =
      data?.output?.choices?.[0]?.message?.content ?? data?.output?.text;

    if (!content) {
      return res.status(502).json({ error: "Invalid response from DashScope" });
    }

    res.status(200).json({ content, model: "qwen-max" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
