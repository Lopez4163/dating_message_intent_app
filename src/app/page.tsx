"use client";

import { useState } from "react";
import type { DatingIntent, CanonicalTone } from "@/app/lib/domain/datingIntent";
import{ useAnalyzer } from "@/app/hooks/analyzer";
import MessageInput from "@/app/components/dash/messageInput";
import Button from "@/app/components/buttons/button";
import AnalyzeOutputWrapper from "./components/dash/analyzeOutputWrapper/analyzeOutputWrapper";
import Link from "next/link";


export default function HomePage() {
const { message, setMessage, data, error, loading, analyze } = useAnalyzer();

  const handleAnalyzeClick = () => {
    analyze();
  };

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: 16 }}>
      <MessageInput message={message} setMessage={setMessage} />
      <Button onClick={handleAnalyzeClick}>Analyze</Button>

      <Link href="/test">
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
      </Link>

      {error && (
        <div style={{ marginTop: 12, color: "#ff6b6b" }}>
          <b>Error:</b> {error}
        </div>
      )}
      <AnalyzeOutputWrapper data={data} />

    </main>
  );
}
