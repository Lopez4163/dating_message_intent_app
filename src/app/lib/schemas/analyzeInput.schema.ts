// analyzeInput.schema.ts
import { z } from "zod";

export const AnalyzeInputSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

export type AnalyzeInput = z.infer<typeof AnalyzeInputSchema>;
