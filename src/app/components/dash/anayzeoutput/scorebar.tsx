import React from 'react'
import type { AnalyzeData } from '@/app/lib/types/analyze';

type Props = Pick<AnalyzeData, "scores">;

export default function Scorebar({ scores }: Props) {
    const pct = (x: number) => `${Math.round(x * 100)}%`;
  return (
<div>
    <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>Scores</div>
    {Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => (
        <div key={k} style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{k}</span>
            <span>{pct(v)}</span>
          </div>
          <div
            style={{
              height: 8,
              background: "#222",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div style={{ width: pct(v), height: "100%", background: "#4aa3ff" }} />
          </div>
        </div>
      ))}
  </div>
  )
}