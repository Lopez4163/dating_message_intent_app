import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { DATING_INTENT_SYSTEM_PROMPT } from "@/app/lib/prompts/datingIntent.system";
import { DatingIntentSchema } from "@/app/lib/Intents/datingIntent";

export const runtime = "nodejs";

const InputSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});


const CANONICAL_TONES = [
  "flirty",
  "playful",
  "curious",
  "direct",
  "dry",
  "warm",
  "sexual",
  "respectful",
  "awkward",
] as const;



const OutputSchema = z.object({
  top_intent: DatingIntentSchema,
  confidence: z.number().min(0).max(1),
  scores: z.object({
    hookup: z.number().min(0).max(1),
    romantic: z.number().min(0).max(1),
    neutral: z.number().min(0).max(1),
    keeping_convo: z.number().min(0).max(1),
    low_interest: z.number().min(0).max(1),
  }),
  tone: z
  .array(
    z
      .string()
      .trim()
      .min(1)
      .max(20)
      .regex(/^[a-z][a-z0-9_ -]*$/i)
  )
  .max(5),
  signals: z
    .array(
      z.object({
        label: z.string().min(1).max(50),
        evidence: z.string().min(1).max(120),
        strength: z.number().min(0).max(1),
      })
    )
    .max(5),
  explanation: z.string().min(1).max(400),
});

export async function POST(req: Request) {
  try {
    const { message } = InputSchema.parse(await req.json());

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    // New SDK; explicitly choose a stable API version
    const ai = new GoogleGenAI({
      apiKey,
      // Docs: SDK defaults to v1beta; set v1 for stability
      httpOptions: { apiVersion: "v1" },
    });

    // Use a current model ID (example shown in official docs uses gemini-2.0-flash)
    const resp = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `${DATING_INTENT_SYSTEM_PROMPT}\n\nMessage:\n${message}` }],
          },
        ],
        config: {
            temperature: 0,        // better for strict JSON
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
      
      function stripMarkdownCodeFences(s: string) {
        return s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      }
      
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
          

    const data = OutputSchema.parse(parsed);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
