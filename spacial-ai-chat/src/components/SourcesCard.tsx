// React import not required with JSX runtime; keep file lightweight
import type { Citation } from "../types";
import { Score } from "./Score";

function prettyName(uri?: string) {
  if (!uri) return "source";
  const parts = uri.split("/");
  return parts[parts.length - 1] || uri;
}

export function SourcesCard({ citations }: { citations?: Citation[] }) {
  return (
    <div className="card">
      <h3 className="h3">Sources</h3>
      {citations?.length ? (
        <div className="list">
          {citations.map((c, i) => (
            <div key={i} className="item">
              <div><span className="score">Score <Score value={c.score} /></span></div>
              <div className="src">
                <a href={c.source_uri} target="_blank" rel="noreferrer">
                  {prettyName(typeof c.source_uri === "string" ? c.source_uri : JSON.stringify(c.source_uri))}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="muted">No citations.</div>
      )}
    </div>
  );
}
