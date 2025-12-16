import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const InputSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

const IntentEnum = z.enum([
  "hookup",
  "romantic",
  "neutral",
  "keeping_convo",
  "low_interest",
]);

const ToneEnum = z.enum([
  "flirty",
  "playful",
  "curious",
  "direct",
  "dry",
  "warm",
  "sexual",
  "respectful",
  "awkward",
  "neutral",
]);

const OutputSchema = z.object({
  top_intent: IntentEnum,
  confidence: z.number().min(0).max(1),
  scores: z.object({
    hookup: z.number().min(0).max(1),
    romantic: z.number().min(0).max(1),
    neutral: z.number().min(0).max(1),
    keeping_convo: z.number().min(0).max(1),
    low_interest: z.number().min(0).max(1),
  }),
  tone: z.array(ToneEnum),
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

const SYSTEM_PROMPT = `
You are a text-message intent classifier for dating/social messages.

Classify intent into one of:
- hookup
- romantic
- neutral
- keeping_convo
- low_interest

Return ONLY valid JSON with EXACTLY this shape/keys:
{
  "top_intent": "hookup|romantic|neutral|keeping_convo|low_interest",
  "confidence": 0 to 1,
  "scores": {
    "hookup": 0 to 1,
    "romantic": 0 to 1,
    "neutral": 0 to 1,
    "keeping_convo": 0 to 1,
    "low_interest": 0 to 1
  },
  "tone": ["flirty|playful|curious|direct|dry|warm|sexual|respectful|awkward"],
  "signals": [
    { "label": string, "evidence": string, "strength": 0 to 1 }
  ],
  "explanation": "1-3 short sentences"
}

Rules:
- scores MUST sum to 1.0.
- top_intent MUST be the highest score.
- confidence <= 0.55 if ambiguous.
- signals.evidence MUST be exact phrases from the message.
- Output JSON only (no markdown / no extra text).
`.trim();

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
            parts: [{ text: `${SYSTEM_PROMPT}\n\nMessage:\n${message}` }],
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
