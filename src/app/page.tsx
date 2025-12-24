"use client";

import { useState } from "react";
import type { DatingIntent, CanonicalTone } from "@/app/lib/domain/datingIntent";
import{ useAnalyzer } from "@/app/hooks/analyzer";
import MessageInput from "@/app/components/dash/messageInput";
import Button from "@/app/components/buttons/button";
import analyzeStyles from "@/app/lib/styles/buttonStyles";

export default function HomePage() {
const { message, setMessage, data, error, loading, analyze } = useAnalyzer();


  const pct = (x: number) => `${Math.round(x * 100)}%`;

  const handleAnalyzeClick = () => {
    analyze();
  };

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: 16 }}>
      <MessageInput message={message} setMessage={setMessage} />
      <Button onClick={handleAnalyzeClick}>Analyze</Button>
      {error && (
        <div style={{ marginTop: 12, color: "#ff6b6b" }}>
          <b>Error:</b> {error}
        </div>
      )}
      
      {data && (
        <section
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#111",
            color: "white",
          }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>Top intent</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{data.top_intent}</div>
            </div>
            <div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>Confidence</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{pct(data.confidence)}</div>
            </div>
          </div>

          <hr style={{ margin: "14px 0", borderColor: "#222" }} />

          <div>
            <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>Scores</div>
            {Object.entries(data.scores)
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

          <hr style={{ margin: "14px 0", borderColor: "#222" }} />

          <div>
            <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>Tone</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {data.tones.map((t) => (
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

          <hr style={{ margin: "14px 0", borderColor: "#222" }} />

          <div>
            <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>Signals</div>
            {data.signals.length === 0 ? (
              <div style={{ opacity: 0.8 }}>No strong signals detected.</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {data.signals.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    <b>{s.label}</b> — “{s.evidence}” ({pct(s.strength)})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <hr style={{ margin: "14px 0", borderColor: "#222" }} />

          <div>
            <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>
              Explanation
            </div>
            <div style={{ lineHeight: 1.5 }}>{data.explanation}</div>
          </div>
        </section>
      )}
    </main>
  );
}
