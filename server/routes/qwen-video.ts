import type { RequestHandler } from "express";
import type { GenerateVideoRequest, GenerateVideoResponse } from "@shared/api";

const DEFAULT_BASE_URL = "https://dashscope-intl.aliyuncs.com/api/v1";
const DEFAULT_VIDEO_PATH = "/services/aigc/video-generation/video-synthesis";

export const handleQwenVideo: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
    }

    const { prompt, videoType, duration, resolution, fps } =
      req.body as GenerateVideoRequest;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing required field: prompt" });
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const path = process.env.DASHSCOPE_VIDEO_PATH || DEFAULT_VIDEO_PATH;
    const url = `${baseUrl}${path}`;

    const model = process.env.DASHSCOPE_VIDEO_MODEL || "wan2.2-t2v-plus";

    // Step 1: Create video task (async)
    const body = {
      model,
      input: { prompt, meta: { videoType, duration, resolution, fps } },
      parameters: {},
    } as const;

    const createRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-DashScope-Async": "enable", // async mode
      },
      body: JSON.stringify(body),
    });

    const createData = await createRes.json();
    console.log("DashScope raw video response:", JSON.stringify(createData, null, 2));

    if (!createRes.ok || !createData?.output?.task_id) {
      return res
        .status(createRes.status)
        .json({ error: `DashScope error: ${JSON.stringify(createData)}` });
    }

    const taskId = createData.output.task_id;
    const taskUrl = `${baseUrl}/tasks/${taskId}`;

    // Step 2: Poll task until completed
    let videoUrl: string | null = null;
    let taskStatus = "PENDING";

    while (taskStatus === "PENDING" || taskStatus === "RUNNING") {
      await new Promise((r) => setTimeout(r, 5000)); // 5 seconds interval

      const pollRes = await fetch(taskUrl, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      const pollData = await pollRes.json();
      console.log("DashScope poll response:", JSON.stringify(pollData, null, 2));

      taskStatus = pollData.output?.task_status;

      if (taskStatus === "SUCCEEDED") {
        // Fix: video_url is directly under output
        videoUrl = pollData.output?.video_url;
        break;
      } else if (taskStatus === "FAILED" || taskStatus === "CANCELED") {
        return res.status(502).json({ error: "DashScope video generation failed" });
      }
    }

    if (!videoUrl) {
      return res
        .status(502)
        .json({ error: "Video not ready or invalid response from DashScope" });
    }

    const result: GenerateVideoResponse = { videoUrl, model };
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
