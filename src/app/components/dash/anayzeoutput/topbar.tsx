import React from 'react'
import type { AnalyzeData } from "@/app/lib/types/analyze";
import "@/app/styles/theme.css";


// Topbar.tsx
type Props = Pick<AnalyzeData, "top_intent" | "confidence">;


export default function Topbar({ top_intent, confidence}: Props) {
    const pct = (x: number) => `${Math.round(x * 100)}%`;

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            Top intent
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            {top_intent}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            Confidence
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            {pct(confidence)}
          </div>
        </div>
      </div>
    </div>
  )
}