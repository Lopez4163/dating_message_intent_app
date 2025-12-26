import React from 'react'
import { AnalyzeData } from '@/app/lib/types/analyze';
import "@/app/styles/theme.css";

type Props =Pick<AnalyzeData, "explanation">;;

export default function Explanationbar({ explanation }: Props) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          marginBottom: 6,
          color: "var(--muted)",
        }}
      >
        Explanation
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--bg",
          lineHeight: 1.5,
          color: "var(--text)",
        }}
      >
        {explanation}
      </div>
    </div>

  )
}