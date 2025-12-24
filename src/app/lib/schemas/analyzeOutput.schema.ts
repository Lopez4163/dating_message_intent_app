import {object, z} from "zod";
import {DatingIntentSchema} from "@/app/lib/domain/datingIntent";
import {CanonicalToneSchema} from "@/app/lib/domain/datingIntent";


export const AnalyzeOutputSchema = z.object({
top_intent: DatingIntentSchema,
confidence: z.number().min(0).max(1),
  scores: z.object({
    hookup: z.number().min(0).max(1),
    romantic: z.number().min(0).max(1),
    neutral: z.number().min(0).max(1),
    keeping_convo: z.number().min(0).max(1),
    low_interest: z.number().min(0).max(1),
  }),
  tones: z.array(CanonicalToneSchema).min(1).max(3), // ✅
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