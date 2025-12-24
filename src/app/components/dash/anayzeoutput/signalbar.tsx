import React from 'react'
import { AnalyzeData } from '@/app/lib/types/analyze';

type Props = Pick<AnalyzeData, "signals">; // => { tones: string[] }
export default function Signalbar({ signals}: Props) {
    const pct = (x: number) => `${Math.round(x * 100)}%`;
  return (
    
    <div>
        <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>Signals</div>
        {signals.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No strong signals detected.</div>
        ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
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