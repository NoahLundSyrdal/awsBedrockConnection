// src/App.tsx
import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import type { RagResponse, Citation, Hit } from "./types";
import { Controls } from "./components/Controls";
import { AnswerCard } from "./components/AnswerCard";
import { SourcesCard } from "./components/SourcesCard";
import { HitsCard } from "./components/HitsCard";

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export default function App() {
  const [query, setQuery] = useState("What are the ventilation requirements for bathrooms?");
  const [topK, setTopK] = useState<number>(10);
  const [minScore, setMinScore] = useState<number>(0.2);
  const [returnSource, setReturnSource] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RagResponse | null>(null);

  const endpoint = useMemo(() => (API_URL ? `${API_URL}/query` : ""), []);

  async function ask() {
    if (!endpoint) {
      setError("VITE_API_URL is not set. Add it in your .env file.");
      return;
    }
    setError(null);
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          top_k: Math.min(Math.max(topK || 1, 1), 20),
          min_score: Number.isFinite(minScore) ? minScore : 0.2,
          return_source: returnSource,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) throw new Error(json?.error || json?.message || `HTTP ${res.status}`);
      setData(json as RagResponse);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setQuery("");
    setData(null);
    setError(null);
  }

  const citations = (data as any)?.citations as Citation[] | undefined;
  const hits = (data as any)?.hits as Hit[] | undefined;
  const answer = (data as any)?.answer as string | undefined;

  useEffect(() => { if (endpoint) ask(); }, [endpoint]); // auto-run once

  return (
    <div className="page">
      <div className="wrap">
        <h1 className="h1">Spacial AI Chat · KB RAG</h1>

        {!API_URL && (
          <div className="card" style={{ border: "1px solid #ff9f9f" }}>
            <div className="error">
              Missing VITE_API_URL. Add it to your .env (e.g. VITE_API_URL=https://...).
            </div>
          </div>
        )}

        <Controls
          query={query}
          topK={topK}
          minScore={minScore}
          returnSource={returnSource}
          loading={loading}
          onChange={(p) => {
            if (p.query !== undefined) setQuery(p.query as string);
            if (p.topK !== undefined) setTopK(p.topK as number);
            if (p.minScore !== undefined) setMinScore(p.minScore as number);
            if (p.returnSource !== undefined) setReturnSource(p.returnSource as boolean);
          }}
          onAsk={ask}
          onClear={clearAll}
        />

        <div className="grid">
          <AnswerCard answer={answer} error={error} hits={hits} />
          <SourcesCard citations={citations} />
        </div>

        <HitsCard hits={hits} />
      </div>
    </div>
  );
}

