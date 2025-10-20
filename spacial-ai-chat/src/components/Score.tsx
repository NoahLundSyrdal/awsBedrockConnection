// React import not required with JSX runtime; keep file lightweight

export function Score({ value }: { value?: number | null }) {
  const s = typeof value === "number" ? value.toFixed(3) : "—";
  return <strong className="score">{s}</strong>;
}
