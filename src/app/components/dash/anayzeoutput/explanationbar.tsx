import React from 'react'
import { AnalyzeData } from '@/app/lib/types/analyze';

type Props =Pick<AnalyzeData, "explanation">;;

export default function Explanationbar({ explanation }: Props) {
  return (
    <div>
        <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>
        Explanation
        </div>
        <div style={{ lineHeight: 1.5 }}>{explanation}</div>
  </div>
  )
}