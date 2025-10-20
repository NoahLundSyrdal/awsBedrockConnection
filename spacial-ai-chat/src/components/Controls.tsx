// React import not required with JSX runtime; keep file lightweight

import type { Props } from "../types";

export function Controls({
  query, topK, minScore, returnSource, loading, onChange, onAsk, onClear
}: Props) {
  return (
    <div className="card">
      <div>
        <label className="label">Question</label>
        <textarea
          className="textarea"
          rows={4}
          value={query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="Ask a construction/code question…"
        />
      </div>

      <div className="row" style={{ marginTop: 8 }}>
        <div>
          <label className="label">Top K (1–20)</label>
          <input
            className="input"
            type="number"
            min={1}
            max={20}
            value={topK}
            onChange={(e) => onChange({ topK: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="label">Min Score (0–1)</label>
          <input
            className="input"
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={minScore}
            onChange={(e) => onChange({ minScore: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="label">Return Sources</label>
          <select
            className="select input"
            value={String(returnSource)}
            onChange={(e) => onChange({ returnSource: e.target.value === "true" })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button className="button primary" onClick={onAsk} disabled={loading || !query.trim()}>
          {loading ? <>Thinking<span className="spinner active" /></> : "Ask"}
        </button>
        <button className="button ghost" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}

