import { DeepseekStream, StreamingTextResponse } from "@ai-sdk/deepseek";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json();

  if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error("Missing DEEPSEEK_API_KEY environment variable");
  }

  const api = new DeepseekStream({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  const response = await api.chat({
    model: model || "deepseek-r1-distill-llama-70b",
    messages: messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })),
    temperature: 0.7,
    max_tokens: 1000,
    stream: true,
  });

  return new StreamingTextResponse(response);
}
