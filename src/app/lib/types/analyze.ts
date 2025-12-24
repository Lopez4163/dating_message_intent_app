import type { DatingIntent, CanonicalTone } from "@/app/lib/domain/datingIntent";

export type AnalyzeData = {
  top_intent: DatingIntent;
  confidence: number;
  scores: Record<string, number>;
  tones: CanonicalTone[];
  signals: { label: string; evidence: string; strength: number }[];
  explanation: string;
};
