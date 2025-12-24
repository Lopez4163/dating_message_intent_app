import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { DATING_INTENT_SYSTEM_PROMPT } from "@/app/lib/prompts/datingIntent.system";
import { CanonicalToneSchema } from "@/app/lib/domain/datingIntent";
import { AnalyzeOutputSchema } from "@/app/lib/schemas/analyzeOutput.schema";
import { AnalyzeInputSchema } from "@/app/lib/schemas/analyzeInput.schema";
import  { stripMarkdownCodeFences } from "@/app/lib/ai/cleanJson";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = AnalyzeInputSchema.parse(await req.json());

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { apiVersion: "v1" },
    });

    const resp = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `${DATING_INTENT_SYSTEM_PROMPT}\n\nMessage:\n${message}` }],
          },
        ],
        config: {
            temperature: 0,       
            maxOutputTokens: 600,
          },          
      });
      
      const text = resp.text ?? "";
      console.log("=== GEMINI RAW OUTPUT START ===");
      console.log(text);
      console.log("=== GEMINI RAW OUTPUT END ===");
      
      if (!text) {
        return NextResponse.json({ error: "Empty response from Gemini" }, { status: 502 });
      }
      
      stripMarkdownCodeFences(text);
      
      const cleaned = stripMarkdownCodeFences(text);
      console.log("=== GEMINI CLEANED OUTPUT START ===");
      console.log(cleaned);
      console.log("=== GEMINI CLEANED OUTPUT END ===");
      
      let parsed: unknown;
      try {
        parsed = JSON.parse(cleaned);
      } catch {
        return NextResponse.json(
          { error: "Model did not return valid JSON", raw: text, cleaned },
          { status: 502 }
        );
      }
      
      const result = AnalyzeOutputSchema.safeParse(parsed);
      if (!result.success) {
        return NextResponse.json(
          {
            error: "Invalid AI output",
            issues: result.error.issues,
            raw: parsed,
          },
          { status: 502 }
        );
      }
      
      return NextResponse.json(result.data);
    } catch (err: any) {
      return NextResponse.json(
        { error: err?.message ?? "Unknown error" },
        { status: 400 }
    );
  }
}
