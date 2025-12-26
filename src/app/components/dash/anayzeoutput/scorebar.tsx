import React from 'react'
import type { AnalyzeData } from '@/app/lib/types/analyze';
import "@/app/styles/theme.css";

type Props = Pick<AnalyzeData, "scores">;

export default function Scorebar({ scores }: Props) {
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
          Scores
        </div>

        {Object.entries(scores)
          .sort((a, b) => b[1] - a[1])
          .map(([k, v]) => (
            <div key={k} style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: "var(--text)",
                }}
              >
                <span>{k}</span>
                <span>{pct(v)}</span>
              </div>

              <div
                style={{
                  height: 8,
                  marginTop: 4,
                  background: "var(--panelSolid)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: pct(v),
                    height: "100%",
                    background: "var(--primary)",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
  )
}