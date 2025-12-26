import React from 'react'
import { AnalyzeData } from '@/app/lib/types/analyze';
import "@/app/styles/theme.css";

type Props = Pick<AnalyzeData, "tones">; 
export default function Tonebar({ tones }: Props){
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          marginBottom: 6,
          color: "var(--muted)",
        }}
      >
        Tone
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tones.map((t) => (
          <span
            key={t}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--panel)",
              fontSize: 13,
              color: "var(--text)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}