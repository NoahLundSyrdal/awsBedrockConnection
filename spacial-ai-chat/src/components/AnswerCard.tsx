import React from "react";

export function AnswerCard({ answer, error, hits }: {
  answer?: string;
  error?: string | null;
  hits?: { snippet?: string }[];
}) {
  return (
    <div className="card">
      <h3 className="h3">Answer</h3>
      {!error ? (
        <div className="answer">
          {answer
            ? answer
            : hits?.length
            ? (<><div className="muted">RAG disabled or no answer. Top hit:</div><div>{hits[0].snippet}</div></>)
            : <span className="muted">—</span>}
        </div>
      ) : (
        <div className="error">{error}</div>
      )}
    </div>
  );
}
