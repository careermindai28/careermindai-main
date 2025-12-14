// src/lib/openaiClient.ts
import OpenAI from "openai";

// Read once so tree-shaking / bundling is clean
const apiKey = process.env.OPENAI_API_KEY;

// If it's missing on the server, fail early (shows up in Vercel logs)
if (!apiKey) {
  console.warn("⚠️ OPENAI_API_KEY is not set in the environment.");
  // You can throw if you prefer hard fail:
  // throw new Error("OPENAI_API_KEY is not set");
}

export const openai = new OpenAI({
  apiKey, // can be undefined in dev; route will handle errors
});

// Default model for all ResumeMind features
export const DEFAULT_MODEL =
  process.env.OPENAI_MODEL_NAME || "gpt-4.1-mini-2025-04-14";
