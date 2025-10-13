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
