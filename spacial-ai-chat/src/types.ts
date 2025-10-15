export type Citation = {
  source_uri?: string;
  score?: number | null;
  metadata?: Record<string, any>;
  source_id?: string;
};

export type Hit = {
  score?: number;
  source_uri?: string;
  snippet?: string;
};

export type RagResponse =
  | { answer: string; citations?: Citation[]; hits?: Hit[] }
  | { hits: Hit[]; region_used?: string }; // retrieve-only


export type Props = {
  query: string;
  topK: number;
  minScore: number;
  returnSource: boolean;
  loading: boolean;
  onChange: (patch: Partial<Omit<Props, "loading" | "onChange" | "onAsk" | "onClear">>) => void;
  onAsk: () => void;
  onClear: () => void;
};
