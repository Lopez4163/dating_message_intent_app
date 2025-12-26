"use client";

import { useState } from "react";
import type { DatingIntent, CanonicalTone } from "@/app/lib/domain/datingIntent";
import{ useAnalyzer } from "@/app/hooks/analyzer";
import MessageInput from "@/app/components/dash/messageInput";
import Button from "@/app/components/buttons/button";
import AnalyzeOutputWrapper from "./components/dash/analyzeOutputWrapper/analyzeOutputWrapper";
import "@/app/styles/theme.css";
import Link from "next/link";


export default function HomePage() {
const { message, setMessage, data, error, loading, analyze } = useAnalyzer();

  const handleAnalyzeClick = () => {
    analyze();
  };

  return (
    <main className="min-h-screen bg-(--bg) text-(--text)">
    {/* If BackgroundWash is global in layout, remove this. */}
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0"/>
    </div>

    <section className="mx-auto max-w-6xl px-6 pt-12 pb-16">
      {/* Page header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-(--panel) ring-1 ring-(--border) px-3 py-1 text-xs text-(--muted) shadow-sm">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent2)" }} />
          vibe check • gentle clarity • reply drafts
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
          Analyze a message —{" "}
          <span style={{ color: "var(--primary)" }}>stay calm, stay in control.</span>
        </h1>

        <p className="mt-2 text-sm sm:text-base text-(--muted) max-w-[70ch]">
          Paste a text and get signal + vibe + suggested replies that match your tone.
        </p>
      </div>

      {/* Main panel */}
      <div
        className="rounded-3xl bg-(--panel) ring-1 ring-(--border) overflow-hidden"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="px-5 py-4 border-b border-(--border) flex items-center justify-between">
          <div className="text-sm font-semibold">Message analyzer</div>
          <div className="text-xs text-(--muted)">
            {loading ? "analyzing…" : "instant • calm • helpful"}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-2xl bg-white ring-1 ring-[var(--border)] p-4">
            <div className="text-xs text-(--muted)">message</div>
            <div className="mt-3">
              <MessageInput message={message} setMessage={setMessage} />
              <Button onClick={handleAnalyzeClick} disabled={loading}>
              {loading ? "Analyzing…" : "Analyze"}
            </Button>
            </div>
          </div>

          {/* Actions */}


          {/* Error */}
          {error && (
            <div className="rounded-2xl bg-white ring-1 ring-(--border) p-4">
              <div className="text-xs text-(--muted)">error</div>
              <div className="mt-2 text-sm" style={{ color: "var(--primary)" }}>
                <b>Error:</b> {error}
              </div>
            </div>
          )}

          {/* Output */}
          <div className="rounded-2xl bg-white ring-1 ring-(--border) p-4">
            <AnalyzeOutputWrapper data={data} />
          </div>

          <div className="text-xs text-(--muted)">
            No judgement — just clarity + options that keep you in control.
          </div>
        </div>
      </div>
    </section>
  </main>
  );
}
