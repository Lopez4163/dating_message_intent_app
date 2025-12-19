// src/lib/domain/datingIntent.ts

export const CANONICAL_TONES = [
    "flirty",
    "playful",
    "neutral",
    "serious",
    "sexual",
  ] as const;
  
  export type CanonicalTone = typeof CANONICAL_TONES[number];
  
  export const INTENTS = [
    "hookup",
    "romantic",
    "neutral",
    "keeping_convo",
    "low_interest",
  ] as const;
  
  export type DatingIntent = typeof INTENTS[number];
  