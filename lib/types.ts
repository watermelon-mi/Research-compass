export type Dimension =
  | "experimentation"
  | "dataAnalysis"
  | "theoryBuilding"
  | "projectTempo"
  | "humanInteraction";

export type DimensionScores = Record<Dimension, number>;

export type ArchetypeId =
  | "mechanismSeeker"
  | "explorer"
  | "analyst"
  | "builder"
  | "collaborator";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  description: string;
  coreMotivation: string;
  strengths: string[];
  challenges: string[];
  environments: string[];
  reflectionQuestions: string[];
}

export interface QuestionOption {
  label: string;
  weights: Partial<Record<Dimension, number>>;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  lifestyle?: boolean;
}

export interface LabProfile {
  scores: DimensionScores;
  matchedKeywords: string[];
}

export interface CompatibilityResult {
  overallMatch: number;
  dimensionMatches: Record<Dimension, number>;
  whyGoodFit: string[];
  potentialChallenges: string[];
  questionsToConsider: string[];
}

export interface FieldRecommendation {
  id: string;
  name: string;
  description: string;
  appealReason: string;
  commonActivities: string[];
  typicalQuestions: string[];
  exampleDay: { time: string; activity: string }[];
}

export const DIMENSIONS: Dimension[] = [
  "experimentation",
  "dataAnalysis",
  "theoryBuilding",
  "projectTempo",
  "humanInteraction",
];

export const DIMENSION_LABELS: Record<Dimension, string> = {
  experimentation: "Experimentation",
  dataAnalysis: "Data Analysis",
  theoryBuilding: "Theory Building",
  projectTempo: "Project Tempo",
  humanInteraction: "Human Interaction",
};

export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  experimentation: "Hands-on work and practical investigation",
  dataAnalysis: "Datasets, patterns, and quantitative reasoning",
  theoryBuilding: "Mechanisms, concepts, and explanations",
  projectTempo: "Short feedback cycles versus long-term exploration",
  humanInteraction: "Working with people versus systems or data",
};

export const RADAR_LABELS: Record<Dimension, string> = {
  experimentation: "Experimentation",
  dataAnalysis: "Data Analysis",
  theoryBuilding: "Theory",
  projectTempo: "Tempo",
  humanInteraction: "Interaction",
};
