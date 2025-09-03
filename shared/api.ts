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
