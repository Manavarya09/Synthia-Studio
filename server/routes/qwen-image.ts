import type { RequestHandler } from "express";
import type { GenerateImageRequest, GenerateImageResponse } from "@shared/api";

const DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com/api/v1";
const DEFAULT_IMAGE_PATH = "/services/aigc/multimodal-generation/generation";

export const handleQwenImage: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
    }

    const { prompt, imageType, style, aspectRatio, quality } =
      req.body as GenerateImageRequest;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing required field: prompt" });
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const path = process.env.DASHSCOPE_IMAGE_PATH || DEFAULT_IMAGE_PATH;
    const url = `${baseUrl}${path}`;
    const model = process.env.DASHSCOPE_IMAGE_MODEL || "qwen-image";

    const body = {
      model,
      input: {
        messages: [
          {
            role: "user",
            content: [{ text: prompt }],
          },
        ],
      },
      parameters: {
        negative_prompt: "",
        prompt_extend: true,
        watermark: false,
        size: aspectRatio || "1328*1328",
        imageType,
        style,
        quality,
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

    const data = await response.json();

    console.log("DashScope raw response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `DashScope error: ${JSON.stringify(data)}` });
    }

    const images: string[] =
      data?.output?.choices?.flatMap((choice: any) =>
        choice?.message?.content?.map((c: any) => c.image).filter(Boolean)
      ) || [];

    if (images.length === 0) {
      return res
        .status(502)
        .json({ error: "No images found in DashScope response" });
    }

    const result: GenerateImageResponse = { images, model };
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
