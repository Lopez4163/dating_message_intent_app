import React from 'react'
import type { AnalyzeData } from "@/app/lib/types/analyze";


// Topbar.tsx
type Props = Pick<AnalyzeData, "top_intent" | "confidence">;


export default function Topbar({ top_intent, confidence}: Props) {
    const pct = (x: number) => `${Math.round(x * 100)}%`;

  return (
    <div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>Top intent</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{top_intent}</div>
            </div>
            <div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>Confidence</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{pct(confidence)}</div>
            </div>
        </div>      
    </div>
  )
}