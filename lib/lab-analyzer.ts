import type {
  CompatibilityResult,
  Dimension,
  DimensionScores,
  LabProfile,
} from "./types";
import { DIMENSION_LABELS, DIMENSIONS } from "./types";
import { getNormalizedScores, getMaxDimensionScores } from "./scoring";

interface KeywordRule {
  keyword: string;
  weights: Partial<Record<Dimension, number>>;
}

const KEYWORD_RULES: KeywordRule[] = [
  { keyword: "genetics", weights: { theoryBuilding: 2, experimentation: 2 } },
  { keyword: "genomic", weights: { theoryBuilding: 2, experimentation: 2 } },
  { keyword: "rna", weights: { experimentation: 3, theoryBuilding: 1 } },
  { keyword: "sequencing", weights: { dataAnalysis: 3, experimentation: 1 } },
  { keyword: "imaging", weights: { experimentation: 3, dataAnalysis: 1 } },
  { keyword: "microscopy", weights: { experimentation: 3 } },
  { keyword: "clinical", weights: { humanInteraction: 3, experimentation: 1 } },
  { keyword: "survey", weights: { humanInteraction: 3, dataAnalysis: 1 } },
  { keyword: "interview", weights: { humanInteraction: 3 } },
  { keyword: "machine learning", weights: { dataAnalysis: 3, theoryBuilding: 1 } },
  { keyword: "deep learning", weights: { dataAnalysis: 3 } },
  { keyword: "modeling", weights: { theoryBuilding: 3, dataAnalysis: 1 } },
  { keyword: "simulation", weights: { theoryBuilding: 2, dataAnalysis: 2 } },
  { keyword: "wet lab", weights: { experimentation: 4 } },
  { keyword: "bench", weights: { experimentation: 3 } },
  { keyword: "protocol", weights: { experimentation: 2, projectTempo: 1 } },
  { keyword: "fieldwork", weights: { experimentation: 3, humanInteraction: 1 } },
  { keyword: "long-term", weights: { theoryBuilding: 2, projectTempo: -2 } },
  { keyword: "long term", weights: { theoryBuilding: 2, projectTempo: -2 } },
  { keyword: "fast-paced", weights: { projectTempo: 3 } },
  { keyword: "fast paced", weights: { projectTempo: 3 } },
  { keyword: "collaborative", weights: { humanInteraction: 3 } },
  { keyword: "interdisciplinary", weights: { humanInteraction: 2, theoryBuilding: 1 } },
  { keyword: "independent", weights: { humanInteraction: -2 } },
  { keyword: "quantitative", weights: { dataAnalysis: 3 } },
  { keyword: "statistics", weights: { dataAnalysis: 3 } },
  { keyword: "mechanism", weights: { theoryBuilding: 3, experimentation: 1 } },
  { keyword: "hypothesis", weights: { theoryBuilding: 2, experimentation: 2 } },
  { keyword: "community", weights: { humanInteraction: 3 } },
  { keyword: "patient", weights: { humanInteraction: 3, experimentation: 1 } },
  { keyword: "neuroscience", weights: { experimentation: 2, theoryBuilding: 2 } },
  { keyword: "psychology", weights: { humanInteraction: 2, dataAnalysis: 2 } },
  { keyword: "bioinformatics", weights: { dataAnalysis: 3, experimentation: 1 } },
  { keyword: "engineering", weights: { experimentation: 2, projectTempo: 2 } },
  { keyword: "prototype", weights: { experimentation: 2, projectTempo: 2 } },
];

const WHY_GOOD_FIT: Record<Dimension, string> = {
  experimentation:
    "Strong alignment with your preference for hands-on experimental work.",
  dataAnalysis:
    "Research style appears to match your interest in data-driven, quantitative inquiry.",
  theoryBuilding:
    "Opportunities for mechanism-focused and conceptual thinking may resonate with your profile.",
  projectTempo:
    "The described pace of work may align with how you prefer to structure research progress.",
  humanInteraction:
    "Collaborative and people-centered aspects of this environment may suit your working style.",
};

const CHALLENGE_LAB_HIGH: Record<Dimension, string> = {
  experimentation:
    "Heavy experimental workload—much of the described work appears bench- or field-oriented.",
  dataAnalysis:
    "Significant quantitative requirements—the environment may expect substantial data analysis.",
  theoryBuilding:
    "Conceptually demanding work—deep theoretical engagement appears central to this lab.",
  projectTempo:
    "Fast-moving project rhythm—frequent milestones and iteration may be expected.",
  humanInteraction:
    "Collaboration-intensive culture—daily interaction with team members may be the norm.",
};

const CHALLENGE_USER_HIGH: Record<Dimension, string> = {
  experimentation:
    "Your profile suggests you enjoy hands-on work, but this environment may offer less experimental opportunity than you prefer.",
  dataAnalysis:
    "You may prefer more analytical work than this environment appears to emphasize.",
  theoryBuilding:
    "You might seek more conceptual depth than this description suggests is available.",
  projectTempo:
    "You may prefer a faster pace than this long-term, sustained project style offers.",
  humanInteraction:
    "You might find limited human interaction here compared to what energizes you.",
};

const QUESTIONS_TO_CONSIDER: Record<Dimension, string[]> = {
  experimentation: [
    "Do you enjoy spending long periods troubleshooting experiments?",
    "Would you find satisfaction in the daily rhythm of bench or field work?",
    "How do you respond when an experiment fails repeatedly before succeeding?",
  ],
  dataAnalysis: [
    "Would you enjoy developing quantitative skills required in this field?",
    "How comfortable are you spending most days working with datasets and code?",
    "Do you find statistical rigor energizing or draining?",
  ],
  theoryBuilding: [
    "Would you enjoy reading literature in this field regularly?",
    "Do you find satisfaction in building explanations even before they can be tested?",
    "How patient are you with questions that take years to answer?",
  ],
  projectTempo: [
    "Does the project timeline described here match how you like to work?",
    "How do you stay motivated during long stretches without visible progress?",
    "Would shorter feedback cycles help or distract you?",
  ],
  humanInteraction: [
    "How much daily collaboration do you find energizing versus exhausting?",
    "Would you enjoy regular meetings and group discussions?",
    "How important is it that your research directly involves other people?",
  ],
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findMatchingKeywords(text: string): string[] {
  const normalized = text.toLowerCase();
  return KEYWORD_RULES.filter(({ keyword }) => {
    const pattern = new RegExp(`\\b${escapeRegex(keyword.toLowerCase())}\\b`);
    return pattern.test(normalized);
  }).map(({ keyword }) => keyword);
}

export function analyzeLabDescription(text: string): LabProfile {
  const scores = {
    experimentation: 0,
    dataAnalysis: 0,
    theoryBuilding: 0,
    projectTempo: 0,
    humanInteraction: 0,
  } satisfies DimensionScores;

  const matchedKeywords = findMatchingKeywords(text);

  for (const keyword of matchedKeywords) {
    const rule = KEYWORD_RULES.find((r) => r.keyword === keyword);
    if (!rule) continue;
    for (const [dimension, weight] of Object.entries(rule.weights)) {
      scores[dimension as Dimension] += weight ?? 0;
    }
  }

  const maxScores = getMaxDimensionScores();
  for (const dimension of DIMENSIONS) {
    scores[dimension] = Math.max(
      0,
      Math.min(scores[dimension], maxScores[dimension] || 12),
    );
  }

  return { scores, matchedKeywords };
}

function dimensionSimilarity(userPct: number, labPct: number): number {
  return Math.max(0, 100 - Math.abs(userPct - labPct));
}

export function compareProfiles(
  userScores: DimensionScores,
  labProfile: LabProfile,
): CompatibilityResult {
  const userNormalized = getNormalizedScores(userScores);
  const labNormalized = getNormalizedScores(labProfile.scores);

  const dimensionMatches = {} as Record<Dimension, number>;
  let totalMatch = 0;

  for (const dimension of DIMENSIONS) {
    const match = dimensionSimilarity(
      userNormalized[dimension],
      labNormalized[dimension],
    );
    dimensionMatches[dimension] = match;
    totalMatch += match;
  }

  const overallMatch = Math.round(totalMatch / DIMENSIONS.length);

  const whyGoodFit: string[] = [];
  const potentialChallenges: string[] = [];
  const questionsToConsider: string[] = [];
  const questionDimensions = new Set<Dimension>();

  for (const dimension of DIMENSIONS) {
    const userVal = userNormalized[dimension];
    const labVal = labNormalized[dimension];
    const diff = Math.abs(userVal - labVal);

    if (userVal >= 50 && labVal >= 45 && diff <= 25) {
      whyGoodFit.push(WHY_GOOD_FIT[dimension]);
    }

    if (labVal >= 55 && userVal < 40) {
      potentialChallenges.push(CHALLENGE_LAB_HIGH[dimension]);
      questionDimensions.add(dimension);
    } else if (userVal >= 60 && labVal < 35) {
      potentialChallenges.push(CHALLENGE_USER_HIGH[dimension]);
      questionDimensions.add(dimension);
    }
  }

  for (const dimension of questionDimensions) {
    const question = QUESTIONS_TO_CONSIDER[dimension][0];
    if (!questionsToConsider.includes(question)) {
      questionsToConsider.push(question);
    }
  }

  if (labProfile.matchedKeywords.includes("wet lab") ||
      labProfile.matchedKeywords.includes("bench")) {
    const q = QUESTIONS_TO_CONSIDER.experimentation[0];
    if (!questionsToConsider.includes(q)) questionsToConsider.push(q);
  }
  if (labProfile.matchedKeywords.some((k) =>
    ["machine learning", "sequencing", "quantitative", "statistics"].includes(k),
  )) {
    const q = QUESTIONS_TO_CONSIDER.dataAnalysis[0];
    if (!questionsToConsider.includes(q)) questionsToConsider.push(q);
  }
  if (labProfile.matchedKeywords.includes("long-term") ||
      labProfile.matchedKeywords.includes("long term")) {
    const q = QUESTIONS_TO_CONSIDER.projectTempo[1];
    if (!questionsToConsider.includes(q)) questionsToConsider.push(q);
  }

  if (whyGoodFit.length === 0) {
    whyGoodFit.push(
      "This environment may offer exposure to research styles different from your strongest preferences—which can be valuable for growth, even when alignment is not obvious.",
    );
  }

  if (potentialChallenges.length === 0) {
    potentialChallenges.push(
      "No major tension points surfaced from this text alone. Differences may still exist that only become visible through conversation or a lab visit.",
    );
  }

  if (questionsToConsider.length < 3) {
    for (const dimension of DIMENSIONS) {
      if (questionsToConsider.length >= 4) break;
      for (const q of QUESTIONS_TO_CONSIDER[dimension]) {
        if (!questionsToConsider.includes(q)) {
          questionsToConsider.push(q);
          break;
        }
      }
    }
  }

  return {
    overallMatch,
    dimensionMatches,
    whyGoodFit: whyGoodFit.slice(0, 4),
    potentialChallenges: potentialChallenges.slice(0, 4),
    questionsToConsider: questionsToConsider.slice(0, 4),
  };
}
