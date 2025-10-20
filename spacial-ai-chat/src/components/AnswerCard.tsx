// React import not required with JSX runtime; keep file lightweight

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
            ? (typeof answer === "string" ? answer : JSON.stringify(answer))
            : hits?.length
            ? (
              <>
                <div className="muted">RAG disabled or no answer. Top hit:</div>
                <div>{typeof hits[0].snippet === "string" ? hits[0].snippet : JSON.stringify(hits[0].snippet)}</div>
              </>
            )
            : <span className="muted">—</span>}
        </div>
      ) : (
        <div className="error">{error}</div>
      )}
    </div>
  );
}
