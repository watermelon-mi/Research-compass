export interface GroupedReflectionItems {
  category: string;
  items: string[];
}

export interface EnvironmentReflectionResult {
  greenFlags: GroupedReflectionItems[];
  challenges: GroupedReflectionItems[];
  questionsToAsk: GroupedReflectionItems[];
  summary: string[];
}
