import type { RequestHandler } from "express";
import type { GeneratePromoVideoRequest, GeneratePromoVideoResponse } from "@shared/api";

const DEFAULT_BASE_URL = "https://dashscope-intl.aliyuncs.com/api/v1";
const DEFAULT_VIDEO_PATH = "/services/aigc/video-generation/video-synthesis";

export const handlePromoVideo: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Server misconfigured: missing DASHSCOPE_API_KEY" });
    }

    const { prompt, script, visualTheme, duration, aspectRatio, quality } =
      req.body as GeneratePromoVideoRequest;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing required field: prompt" });
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL;
    const path = process.env.DASHSCOPE_VIDEO_PATH || DEFAULT_VIDEO_PATH;
    const url = `${baseUrl}${path}`;

    const model = process.env.DASHSCOPE_VIDEO_MODEL || "wan2.2-t2v-plus";

    // Enhanced prompt for promo video with theme and script context
    let enhancedPrompt = prompt;
    if (script) {
      enhancedPrompt = `Create a promotional video based on this script: "${script}". Visual style: ${visualTheme || 'corporate'}. ${prompt}`;
    } else {
      enhancedPrompt = `Create a promotional video with ${visualTheme || 'corporate'} visual style. ${prompt}`;
    }

    // Map aspect ratio to resolution
    const getResolution = (ratio: string) => {
      switch (ratio) {
        case "16:9": return "1280x720";
        case "1:1": return "720x720";
        case "9:16": return "720x1280";
        case "4:5": return "720x900";
        default: return "1280x720";
      }
    };

    const resolution = getResolution(aspectRatio || "16:9");
    const videoDuration = duration || 20;

    // Step 1: Create video task (async)
    const body = {
      model,
      input: { 
        prompt: enhancedPrompt,
        meta: { 
          videoType: "promo",
          duration: videoDuration,
          resolution,
          fps: 24
        }
      },
      parameters: {
        quality: quality || 80
      },
    } as const;

    console.log("DashScope Promo Video request:", JSON.stringify(body, null, 2));

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
    console.log("DashScope Promo Video Raw Response:", JSON.stringify(createData, null, 2));

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
    let pollCount = 0;
    const maxPolls = 60; // 5 minutes max (60 * 5 seconds)

    while ((taskStatus === "PENDING" || taskStatus === "RUNNING") && pollCount < maxPolls) {
      await new Promise((r) => setTimeout(r, 5000)); // 5 seconds interval
      pollCount++;

      const pollRes = await fetch(taskUrl, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      const pollData = await pollRes.json();
      console.log(`DashScope promo video poll ${pollCount}:`, JSON.stringify(pollData, null, 2));

      taskStatus = pollData.output?.task_status;

      if (taskStatus === "SUCCEEDED") {
        videoUrl = pollData.output?.video_url;
        break;
      } else if (taskStatus === "FAILED" || taskStatus === "CANCELED") {
        return res.status(502).json({ 
          error: `Promo video generation failed: ${pollData.output?.message || 'Unknown error'}` 
        });
      }
    }

    if (!videoUrl) {
      return res
        .status(502)
        .json({ error: "Promo video generation timeout or invalid response from DashScope" });
    }

    const result: GeneratePromoVideoResponse = { 
      videoUrl, 
      model,
      duration: videoDuration,
      aspectRatio: aspectRatio || "16:9"
    };
    
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Promo video generation error:", err);
    res.status(500).json({ error: message });
  }
};
