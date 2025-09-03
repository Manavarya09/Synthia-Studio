import type { RequestHandler } from "express";
import type { GenerateAudioRequest, GenerateAudioResponse } from "@shared/api";

const DEFAULT_BASE_URL = "https://dashscope-intl.aliyuncs.com/api/v1";
const DEFAULT_AUDIO_PATH = "/services/aigc/speech-synthesis/generation";

export const handleQwenAudio: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      res
        .status(500)
        .json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
      return;
    }

    const { text, audioType, voice, language, speed, pitch } =
      req.body as GenerateAudioRequest;
    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "Missing required field: text" });
      return;
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const path = process.env.DASHSCOPE_AUDIO_PATH || DEFAULT_AUDIO_PATH;
    const url = `${baseUrl}${path}`;

    const model = process.env.DASHSCOPE_AUDIO_MODEL || "qwen-audio";

    const body = {
      model,
      input: {
        text,
        meta: {
          audioType,
          voice,
          language,
          speed,
          pitch,
        },
      },
      parameters: {
        format: "mp3",
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

    let audioUrl: string | undefined =
      data?.output?.audio_url || data?.output?.url || data?.data?.[0]?.url;

    if (!audioUrl) {
      const b64: string | undefined =
        data?.output?.b64_json || data?.b64_json || data?.audio_base64;
      if (b64) audioUrl = `data:audio/mpeg;base64,${b64}`;
    }

    if (!audioUrl) {
      res
        .status(502)
        .json({ error: "Invalid response from DashScope (no audio)" });
      return;
    }

    const result: GenerateAudioResponse = { audioUrl, model };
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
