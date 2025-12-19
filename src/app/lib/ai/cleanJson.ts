export function stripMarkdownCodeFences(s: string) {
    return s
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
  }
  