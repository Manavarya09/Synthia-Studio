/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Request body for text generation endpoint
 */
export interface GenerateTextRequest {
  prompt: string;
  contentType?: string;
  tone?: string;
}

/**
 * Response body for text generation endpoint
 */
export interface GenerateTextResponse {
  content: string;
  model: string;
}

/**
 * Request body for image generation endpoint
 */
export interface GenerateImageRequest {
  prompt: string;
  imageType?: string;
  style?: string;
  aspectRatio?: string;
  quality?: number;
}

/**
 * Response body for image generation endpoint
 */
export interface GenerateImageResponse {
  images: string[];
  model: string;
}

/**
 * Request body for video generation endpoint
 */
export interface GenerateVideoRequest {
  prompt: string;
  videoType?: string;
  duration?: number;
  resolution?: string;
  fps?: number;
}

/**
 * Response body for video generation endpoint
 */
export interface GenerateVideoResponse {
  videoUrl: string;
  model: string;
}

/**
 * Request body for audio generation endpoint
 */
export interface GenerateAudioRequest {
  text: string;
  audioType?: string;
  voice?: string;
  language?: string;
  speed?: number;
  pitch?: number;
}

/**
 * Response body for audio generation endpoint
 */
export interface GenerateAudioResponse {
  audioUrl: string;
  model: string;
}
