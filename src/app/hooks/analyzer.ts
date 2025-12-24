"use client";
import { useState } from "react";
import type { DatingIntent, CanonicalTone } from "@/app/lib/domain/datingIntent";

type AnalyzeResponse = {
    top_intent: DatingIntent;
    confidence: number;
    scores: Record<string, number>;
    tones: CanonicalTone[];
    signals: { label: string; evidence: string; strength: number }[];
    explanation: string;
  };

export function useAnalyzer(){
    const [message, setMessage] = useState("");
    const [data, setData] = useState<AnalyzeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);   
    const [loading, setLoading] = useState(false);

    async function analyze() {
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
    }
    return {
        message,
        setMessage,
        data,
        error,
        loading,
        analyze,    
    }
};



  