import { z } from "zod";

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

  //RUN TIME VALIDATED
  export const CanonicalToneSchema = z.enum(CANONICAL_TONES);
  export const DatingIntentSchema = z.enum(INTENTS);
  

  
  