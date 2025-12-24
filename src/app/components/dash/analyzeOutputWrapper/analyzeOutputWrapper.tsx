import React from 'react'
import Topbar from '../anayzeoutput/topbar';
import Scorebar from '../anayzeoutput/scorebar';
import Tonebar from '../anayzeoutput/tonebar';
import Signalbar from '../anayzeoutput/signalbar';
import Explanationbar from '../anayzeoutput/explanationbar';
import { AnalyzeData } from '@/app/lib/types/analyze';

type Props = {
    data: AnalyzeData | null;
}
  
  export default function AnalyzeOutputWrapper({ data }: Props) {
    if (!data) return null;
  
    return (
      <section>
        <Topbar
        confidence={data.confidence}
        top_intent={data.top_intent}
        />
        <Scorebar scores={data.scores} />
        <Tonebar tones={data.tones} />
        <Signalbar signals={data.signals} />
        <Explanationbar explanation={data.explanation} />
      </section>
    );
  }
  