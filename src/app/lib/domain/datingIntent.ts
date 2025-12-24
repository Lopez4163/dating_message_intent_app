import { z } from "zod";

  export const INTENTS = [
    "hookup",
    "romantic",
    "neutral",
    "keeping_convo",
    "low_interest",
  ] as const;
  
  export type DatingIntent = typeof INTENTS[number];

  export const CANONICAL_TONES = [
    "flirty",
    "playful",
    "neutral",
    "serious",
    "sexual",
    "romantic",
  ] as const;
  
  export type CanonicalTone = typeof CANONICAL_TONES[number];

  //RUN TIME VALIDATED
  export const CanonicalToneSchema = z.enum(CANONICAL_TONES);
  export const DatingIntentSchema = z.enum(INTENTS);
  

  
  