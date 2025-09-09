import type { RequestHandler } from "express";
import type { EditImageRequest, EditImageResponse } from "@shared/api";

const DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com/api/v1";
const DEFAULT_IMAGE_EDIT_PATH = "/services/aigc/text2image-editing/image-editing";

export const handleQwenImageEdit: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
    }

    const { imageUrl, editPrompt, negativePrompt } =
      req.body as EditImageRequest;
    
    if (!imageUrl || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "Missing required field: imageUrl" });
    }
    
    if (!editPrompt || typeof editPrompt !== "string") {
      return res.status(400).json({ error: "Missing required field: editPrompt" });
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const path = process.env.DASHSCOPE_IMAGE_EDIT_PATH || DEFAULT_IMAGE_EDIT_PATH;
    const url = `${baseUrl}${path}`;

    const model = process.env.DASHSCOPE_IMAGE_EDIT_MODEL || "qwen-image-edit";

    const body = {
      model,
      input: {
        messages: [
          {
            role: "user",
            content: [
              {
                image: imageUrl,
              },
              {
                text: editPrompt,
              },
            ],
          },
        ],
      },
      parameters: {
        negative_prompt: negativePrompt || "",
        watermark: false,
      },
    } as const;

    console.log("DashScope Image Edit request:", JSON.stringify(body, null, 2));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    console.log("DashScope Image Edit Raw Response:", JSON.stringify(data, null, 2));
    
    const editedImages: string[] = [];
    if (data?.output?.choices) {
      for (const choice of data.output.choices) {
        if (choice.message?.content) {
          for (const content of choice.message.content) {
            if (content.image) {
              editedImages.push(content.image);
            }
          }
        }
      }
    }

    if (editedImages.length === 0) {
      return res.status(502).json({ error: "No edited images returned from DashScope" });
    }

    const result: EditImageResponse = {
      editedImages,
      model: "qwen-image-edit",
      originalImage: imageUrl,
    };

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Image editing error:", err);
    res.status(500).json({ error: message });
  }
};