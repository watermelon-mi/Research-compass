import type { Archetype, Dimension, DimensionScores } from "./types";
import { DIMENSION_LABELS } from "./types";
import { getNormalizedScores, getTopDimensions, getLowDimensions } from "./scoring";

const DIMENSION_NARRATIVES: Record<
  Dimension,
  { high: string; moderate: string; low: string }
> = {
  experimentation: {
    high: "You appear to enjoy hands-on investigation and learning through direct experimentation.",
    moderate:
      "You may appreciate a balance between practical work and other modes of inquiry.",
    low: "You might prefer research that emphasizes thinking, analysis, or collaboration over bench work.",
  },
  dataAnalysis: {
    high: "Your responses suggest a strong pull toward working with data, patterns, and quantitative evidence.",
    moderate:
      "You may be comfortable with data when it serves a broader research question.",
    low: "You might find the most satisfaction in aspects of research beyond statistical analysis.",
  },
  theoryBuilding: {
    high: "You appear to enjoy understanding mechanisms and concepts more than immediate practical applications.",
    moderate:
      "You may value both conceptual depth and practical outcomes in your research.",
    low: "You might prefer research oriented toward action and results over abstract theory.",
  },
  projectTempo: {
    high: "Your profile suggests comfort with faster iteration and shorter feedback cycles.",
    moderate:
      "You may adapt well to different project rhythms depending on the question.",
    low: "You might prefer long-term intellectual exploration over rapid turnaround work.",
  },
  humanInteraction: {
    high: "You tend to find energy in collaborative settings and research that connects with people.",
    moderate:
      "You may enjoy both independent focus and meaningful collaboration.",
    low: "You might prefer research environments with substantial independent work time.",
  },
};

function tier(value: number): "high" | "moderate" | "low" {
  if (value >= 65) return "high";
  if (value >= 40) return "moderate";
  return "low";
}

export function generateReflectionSummary(
  scores: DimensionScores,
  archetype: Archetype,
): string[] {
  const normalized = getNormalizedScores(scores);
  const top = getTopDimensions(scores, 2);
  const low = getLowDimensions(scores, 1);

  const paragraphs: string[] = [];

  paragraphs.push(
    DIMENSION_NARRATIVES[top[0]][tier(normalized[top[0]])],
  );

  if (top[1] && top[1] !== top[0]) {
    paragraphs.push(
      DIMENSION_NARRATIVES[top[1]][tier(normalized[top[1]])],
    );
  }

  if (tier(normalized.projectTempo) === "low") {
    paragraphs.push(
      "Your responses suggest a preference for long-term intellectual exploration and moderately independent work.",
    );
  } else if (tier(normalized.projectTempo) === "high") {
    paragraphs.push(
      "You may find satisfaction in research environments that offer frequent feedback and visible progress.",
    );
  }

  if (tier(normalized.humanInteraction) === "high") {
    paragraphs.push(
      "You may enjoy research environments that reward communication, teamwork, and shared problem-solving.",
    );
  } else if (tier(normalized.humanInteraction) === "low") {
    paragraphs.push(
      "You might appreciate environments that protect focused, independent time for deep work.",
    );
  }

  paragraphs.push(
    `Your profile shares qualities with ${archetype.name.replace("The ", "the ")}—${archetype.coreMotivation.toLowerCase().replace(/\.$/, "")} appears to be a recurring theme for you.`,
  );

  paragraphs.push(
    "When evaluating future labs or fields, consider whether the daily work aligns with how you enjoy solving problems—not just whether the topic sounds interesting on paper.",
  );

  if (low[0] && tier(normalized[low[0]]) === "low") {
    paragraphs.push(
      `It may also be worth reflecting on how much ${DIMENSION_LABELS[low[0]].toLowerCase()} factors into your ideal research day, since it appeared less prominently in your responses.`,
    );
  }

  return paragraphs;
}
