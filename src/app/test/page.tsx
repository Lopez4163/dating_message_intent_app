"use client";

import React from "react";

export default function Test() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Theme tokens */}
      <style jsx global>{`
        :root {
          /* Option A — Terracotta + Sage (recommended) */
          --bg: #faf7f2;
          --bg2: #fffdf9;
          --panel: rgba(255, 255, 255, 0.82);
          --panelSolid: #ffffff;
          --border: rgba(31, 41, 55, 0.10);
          --text: #1f2937;
          --muted: rgba(31, 41, 55, 0.65);

          --primary: #d97757;
          --primaryHover: #c76548;
          --primaryText: #ffffff;

          --accent: #84a98c; /* sage */
          --accent2: #f2c14e; /* honey */

          --shadow: 0 18px 45px rgba(15, 23, 42, 0.10);
        }

        /* If you want to try other schemes, swap the block above with one below:

        :root {  // Option B — Peach + Plum
          --bg:#fff4f1; --bg2:#fffaf8; --panel:rgba(255,255,255,.85); --panelSolid:#fff;
          --border:rgba(31,41,55,.10); --text:#1f2937; --muted:rgba(31,41,55,.62);
          --primary:#f07167; --primaryHover:#e85d52; --primaryText:#fff;
          --accent:#6d597a; --accent2:#f2cc8f; --shadow:0 18px 45px rgba(15,23,42,.10);
        }

        :root {  // Option C — Sky + Apricot
          --bg:#f7fbff; --bg2:#ffffff; --panel:rgba(255,255,255,.85); --panelSolid:#fff;
          --border:rgba(2,6,23,.10); --text:#0f172a; --muted:rgba(15,23,42,.60);
          --primary:#fb923c; --primaryHover:#f97316; --primaryText:#1f2937;
          --accent:#38bdf8; --accent2:#a78bfa; --shadow:0 18px 45px rgba(15,23,42,.10);
        }

        :root {  // Option D — Mint + Coral
          --bg:#f4fbf8; --bg2:#ffffff; --panel:rgba(255,255,255,.85); --panelSolid:#fff;
          --border:rgba(2,6,23,.10); --text:#0f172a; --muted:rgba(15,23,42,.58);
          --primary:#ff6b6b; --primaryHover:#f25555; --primaryText:#ffffff;
          --accent:#2ec4b6; --accent2:#ffe66d; --shadow:0 18px 45px rgba(15,23,42,.10);
        }
        */
      `}</style>

      {/* warm, friendly gradient wash */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 650px at 12% -10%, rgba(217,119,87,0.22), transparent 60%)," +
              "radial-gradient(900px 520px at 92% 0%, rgba(132,169,140,0.18), transparent 55%)," +
              "radial-gradient(900px 700px at 55% 115%, rgba(242,193,78,0.18), transparent 60%)," +
              "linear-gradient(to bottom, rgba(255,255,255,0.70), rgba(255,255,255,0.25), rgba(255,255,255,0.55))",
          }}
        />
      </div>

      {/* top nav */}
      <header className="border-b border-[var(--border)] bg-[var(--panel)] backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[var(--panelSolid)] shadow-sm ring-1 ring-[var(--border)] flex items-center justify-center">
              <span className="font-semibold">t</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">test</div>
              <div className="text-xs text-[var(--muted)]">friendly dating clarity</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--muted)]">
            <a href="#product" className="hover:opacity-80 transition">
              Product
            </a>
            <a href="#how" className="hover:opacity-80 transition">
              How it works
            </a>
            <a href="#trust" className="hover:opacity-80 transition">
              Safety
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm text-[var(--muted)] hover:opacity-80 transition">
              Sign in
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-full shadow-sm transition"
              style={{ background: "var(--primary)", color: "var(--primaryText)" }}
              onMouseEnter={(e) => ((e.currentTarget.style.background = "var(--primaryHover)"))}
              onMouseLeave={(e) => ((e.currentTarget.style.background = "var(--primary)"))}
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--panel)] ring-1 ring-[var(--border)] px-3 py-1 text-xs text-[var(--muted)] shadow-sm">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent2)" }} />
              made for dating with intention (and peace)
            </div>

            <h1 className="mt-5 text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
              Clarity for the texts that{" "}
              <span style={{ color: "var(--primary)" }}>leave you guessing.</span>
            </h1>

            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed max-w-[56ch]">
              Paste a message. Get a gentle read, a simple signal, and replies that
              match your tone — while keeping your boundaries intact.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                className="px-5 py-3 font-semibold rounded-full shadow-sm transition"
                style={{ background: "var(--primary)", color: "var(--primaryText)" }}
                onMouseEnter={(e) => ((e.currentTarget.style.background = "var(--primaryHover)"))}
                onMouseLeave={(e) => ((e.currentTarget.style.background = "var(--primary)"))}
              >
                Try a vibe check
              </button>

              <button className="px-5 py-3 rounded-full bg-[var(--panel)] ring-1 ring-[var(--border)] hover:bg-white transition shadow-sm">
                View examples
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-[var(--muted)]">
              {["vibe check", "mixed signals", "reply drafts", "boundaries-first"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--panel)] ring-1 ring-[var(--border)] px-3 py-1 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* product preview */}
          <div
            id="product"
            className="rounded-3xl bg-[var(--panel)] ring-1 ring-[var(--border)] overflow-hidden"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div className="text-sm font-semibold">Live preview</div>
              <div className="text-xs text-[var(--muted)]">instant • calm • helpful</div>
            </div>

            <div className="p-5 space-y-4">
              <div className="rounded-2xl bg-white ring-1 ring-[var(--border)] p-4">
                <div className="text-xs text-[var(--muted)]">message</div>
                <div className="mt-2 text-sm">“come over rn 😉”</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white ring-1 ring-[var(--border)] p-4">
                  <div className="text-xs text-[var(--muted)]">signal</div>
                  <div className="mt-2 text-sm font-semibold">🟡 Caution</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">last-minute / pressure</div>
                </div>

                <div className="rounded-2xl bg-white ring-1 ring-[var(--border)] p-4">
                  <div className="text-xs text-[var(--muted)]">vibe</div>
                  <div className="mt-2 text-sm font-semibold">Flirty invite</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">pretty likely</div>
                </div>

                <div className="rounded-2xl bg-white ring-1 ring-[var(--border)] p-4">
                  <div className="text-xs text-[var(--muted)]">suggested approach</div>
                  <div className="mt-2 text-sm font-semibold">Kind boundary</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">warm + clear</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white ring-1 ring-[var(--border)] p-4">
                <div className="text-xs text-[var(--muted)]">reply options</div>
                <div className="mt-2 space-y-2 text-sm">
                  <div>“Not doing last-minute — but I’m down to plan something.”</div>
                  <div className="opacity-80">
                    “I’m staying in tonight. Want to set something up tomorrow? 🙂”
                  </div>
                </div>
              </div>

              <div className="text-xs text-[var(--muted)]">
                No judgement — just clarity + options that keep you in control.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              k: "01",
              t: "Paste the message",
              d: "Drop in a text (or quick transcription). You don’t need the whole convo.",
              e: "📝",
            },
            {
              k: "02",
              t: "Get a gentle read",
              d: "We highlight patterns like pressure, mixed signals, and the overall vibe — fast.",
              e: "🌤️",
            },
            {
              k: "03",
              t: "Choose your reply",
              d: "Pick a tone: warm, playful, or firm. You’re always in control.",
              e: "💬",
            },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-3xl bg-[var(--panel)] ring-1 ring-[var(--border)] p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-[var(--muted)]">{x.k}</div>
                <div className="text-lg">{x.e}</div>
              </div>
              <div className="mt-2 text-xl font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* trust */}
      <section id="trust" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-[var(--panel)] ring-1 ring-[var(--border)] p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Built to feel safe — and a little lighter.
              </h2>
              <p className="mt-3 text-[var(--muted)] leading-relaxed">
                This isn’t about “winning” dating. It’s about helping you protect your time,
                energy, and boundaries — especially when messages feel confusing.
              </p>

              <div className="mt-5 grid gap-3">
                {[
                  "Boundaries-first reply suggestions",
                  "Gentle nudges (not alarmist)",
                  "Tone options: soft → firm",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm">
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                    <span className="text-[var(--muted)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white ring-1 ring-[var(--border)] p-6">
              <div className="text-xs text-[var(--muted)]">example boundary</div>
              <div className="mt-3 text-lg font-semibold">“I’m not comfortable with that.”</div>
              <div className="mt-2 text-sm text-[var(--muted)]">
                Follow-up options that keep things respectful without over-explaining.
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  className="px-5 py-3 font-semibold rounded-full shadow-sm transition"
                  style={{ background: "var(--primary)", color: "var(--primaryText)" }}
                  onMouseEnter={(e) => ((e.currentTarget.style.background = "var(--primaryHover)"))}
                  onMouseLeave={(e) => ((e.currentTarget.style.background = "var(--primary)"))}
                >
                  Start free
                </button>
                <button className="px-5 py-3 rounded-full bg-white ring-1 ring-[var(--border)] hover:bg-slate-50 transition shadow-sm">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--panel)] backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-[var(--muted)]">
          <div>© {new Date().getFullYear()} test</div>
          <div className="flex gap-5">
            <a href="#" className="hover:opacity-80 transition">Privacy</a>
            <a href="#" className="hover:opacity-80 transition">Terms</a>
            <a href="#" className="hover:opacity-80 transition">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
