import type { RequestHandler } from "express";
import type { GenerateTextRequest, GenerateTextResponse } from "@shared/api";

const DEFAULT_BASE_URL = "https://dashscope-intl.aliyuncs.com/api/v1";
const GENERATION_PATH = "/services/aigc/text-generation/generation";

export const handleQwenText: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      res
        .status(500)
        .json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
      return;
    }

    const { prompt, contentType, tone } = req.body as GenerateTextRequest;
    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Missing required field: prompt" });
      return;
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const url = `${baseUrl}${GENERATION_PATH}`;

    const userContent = `Content type: ${contentType || "general"}\nTone: ${tone || "professional"}\n\nPrompt: ${prompt}`;

    const body = {
      model: "qwen-max",
      input: {
        messages: [
          {
            role: "system",
            content:
              "You are a helpful writing assistant. Produce well-structured, clear, and concise content that matches the requested format and tone.",
          },
          { role: "user", content: userContent },
        ],
      },
      parameters: {
        result_format: "message",
      },
    } as const;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      res
        .status(response.status)
        .json({ error: `DashScope error: ${text || response.statusText}` });
      return;
    }

    const data = await response.json();
    // Expected shape (message format): data.output.choices[0].message.content
    const content: string | undefined =
      data?.output?.choices?.[0]?.message?.content ?? data?.output?.text;

    if (!content) {
      res.status(502).json({ error: "Invalid response from DashScope" });
      return;
    }

    const result: GenerateTextResponse = {
      content,
      model: "qwen-max",
    };

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
