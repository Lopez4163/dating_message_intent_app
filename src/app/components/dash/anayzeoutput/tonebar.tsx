import React from 'react'
import { AnalyzeData } from '@/app/lib/types/analyze';

type Props = Pick<AnalyzeData, "tones">; 
export default function Tonebar({ tones }: Props){
  return (
    <div>
    <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>Tone</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {tones.map((t) => (
        <span
          key={t}
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "1px solid #333",
            background: "#0b0b0b",
            fontSize: 13,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
  )
}