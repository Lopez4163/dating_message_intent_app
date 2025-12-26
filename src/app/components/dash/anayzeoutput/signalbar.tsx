import React from 'react'
import { AnalyzeData } from '@/app/lib/types/analyze';
import "@/app/styles/theme.css";

type Props = Pick<AnalyzeData, "signals">; // => { tones: string[] }
export default function Signalbar({ signals}: Props) {
    const pct = (x: number) => `${Math.round(x * 100)}%`;
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          marginBottom: 6,
          color: "var(--muted)",
        }}
      >
        Signals
      </div>

      {signals.length === 0 ? (
        <div
          style={{
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          No strong signals detected.
        </div>
      ) : (
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            color: "var(--text)",
          }}
        >
          {signals.map((s, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              <b>{s.label}</b> — “{s.evidence}” ({pct(s.strength)})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}