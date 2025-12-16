"use client";

import { useState } from "react";

type AnalyzeResponse = {
  top_intent: "hookup" | "romantic" | "neutral" | "keeping_convo" | "low_interest";
  confidence: number;
  scores: Record<string, number>;
  tone: string[];
  signals: { label: string; evidence: string; strength: number }[];
  explanation: string;
};

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyzeResponse | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");

      setData(json);
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  const pct = (x: number) => `${Math.round(x * 100)}%`;

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Message Intent Analyzer</h1>
      <p style={{ opacity: 0.8 }}>
        Paste a message → Gemini classifies intent with confidence + evidence.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste a message here..."
        rows={6}
        style={{
          width: "100%",
          marginTop: 12,
          padding: 12,
          borderRadius: 10,
          border: "1px solid #333",
          background: "#0b0b0b",
          color: "white",
        }}
      />

      <button
        onClick={analyze}
        disabled={loading || message.trim().length === 0}
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #333",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

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
              {data.tone.map((t) => (
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
