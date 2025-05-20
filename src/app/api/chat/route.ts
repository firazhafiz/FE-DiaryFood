import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 });
    }

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create the prompt
    const prompt = `Kamu adalah asisten memasak yang membantu dengan resep, teknik memasak, dan pertanyaan seputar makanan. Berikan jawaban yang ringkas dan praktis.

User: ${lastUserMessage.content}
Assistant:`;

    try {
      // Generate response
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text();

      return NextResponse.json({ response: aiResponse });
    } catch (modelError: unknown) {
      console.error("Model error:", modelError);

      // Handle specific model errors
      if (modelError instanceof Error) {
        if (modelError.message?.includes("404")) {
          return NextResponse.json({ error: "Model tidak tersedia. Silakan coba lagi nanti." }, { status: 503 });
        }

        if (modelError.message?.includes("403")) {
          return NextResponse.json({ error: "Akses ke model ditolak. Silakan periksa API key Anda." }, { status: 403 });
        }

        if (modelError.message?.includes("429")) {
          return NextResponse.json({ error: "Terlalu banyak permintaan. Silakan tunggu beberapa saat." }, { status: 429 });
        }
      }

      throw modelError; // Re-throw other model errors
    }
  } catch (error) {
    console.error("Error in chat API:", error);

    if (error instanceof Error) {
      if (error.message.includes("429")) {
        return NextResponse.json({ error: "Rate limit exceeded. Please try again in a few seconds." }, { status: 429 });
      }
      if (error.message.includes("401")) {
        return NextResponse.json({ error: "Invalid API key. Please check your configuration." }, { status: 401 });
      }
      if (error.message.includes("400")) {
        return NextResponse.json({ error: "Invalid request. Please check your input." }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Terjadi kesalahan. Silakan coba lagi nanti." }, { status: 500 });
  }
}
