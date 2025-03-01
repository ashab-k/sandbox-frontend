export type TechniqueItem = {
  [name: string]: string;
};

export type AttackData = {
  [tactic: string]: TechniqueItem[];
};
