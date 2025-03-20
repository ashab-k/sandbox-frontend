export type TechniqueItem = {
  [name: string]: string;
};

export type AttackData = {
  [tactic: string]: TechniqueItem[];
};
export type VirusTotalAnalysis = {
  data: {
    id: string;
    type: "analysis";
    links: {
      self: string;
      item: string;
    };
    attributes: {
      date: number;
      status: "completed" | "pending" | "failed";
      results: Record<string, VirusScanResult>;
    };
  };
};

type VirusScanResult = {
  method: "blacklist" | "whitelist" | "heuristic" | "ml";
  engine_name: string;
  engine_version: string;
  engine_update: string;
  category: "malicious" | "undetected" | "suspicious" | "harmless";
  result: string | null;
};
