import React from "react";
import type { Hit } from "../types";
import { Score } from "./Score";

function prettyName(uri?: string) {
  if (!uri) return "source";
  const parts = uri.split("/");
  return parts[parts.length - 1] || uri;
}

export function HitsCard({ hits }: { hits?: Hit[] }) {
  return (
    <div className="card">
      <h3 className="h3">Retrieved context (hits)</h3>
      {hits?.length ? (
        <div className="list">
          {hits.map((h, i) => (
            <div key={i} className="item">
              <div>
                <strong>{prettyName(h.source_uri)}</strong> · <Score value={h.score} />
              </div>
              <div className="muted">{h.snippet}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="muted">—</div>
      )}
    </div>
  );
}
