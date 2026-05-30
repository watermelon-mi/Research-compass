import type { Dimension, LabProfile } from "./types";
import { DIMENSIONS } from "./types";
import { getNormalizedScores } from "./scoring";
import type {
  EnvironmentReflectionResult,
  GroupedReflectionItems,
} from "./environment-reflection-types";

interface CultureSignal {
  keyword: string;
  tags: string[];
}

const CULTURE_SIGNALS: CultureSignal[] = [
  { keyword: "mentor", tags: ["mentorship"] },
  { keyword: "mentorship", tags: ["mentorship"] },
  { keyword: "training", tags: ["mentorship", "learning"] },
  { keyword: "undergraduate", tags: ["mentorship", "project"] },
  { keyword: "student", tags: ["mentorship"] },
  { keyword: "collaborative", tags: ["culture"] },
  { keyword: "collaboration", tags: ["culture"] },
  { keyword: "team", tags: ["culture"] },
  { keyword: "interdisciplinary", tags: ["culture", "learning"] },
  { keyword: "meeting", tags: ["culture", "communication"] },
  { keyword: "journal club", tags: ["learning", "culture"] },
  { keyword: "seminar", tags: ["learning"] },
  { keyword: "present", tags: ["learning"] },
  { keyword: "publication", tags: ["learning", "project"] },
  { keyword: "hypothesis", tags: ["project"] },
  { keyword: "mechanism", tags: ["project"] },
  { keyword: "independent", tags: ["autonomy"] },
  { keyword: "autonomy", tags: ["autonomy"] },
  { keyword: "long-term", tags: ["timeline"] },
  { keyword: "long term", tags: ["timeline"] },
  { keyword: "fast-paced", tags: ["pace"] },
  { keyword: "fast paced", tags: ["pace"] },
  { keyword: "clinical", tags: ["culture", "learning"] },
  { keyword: "community", tags: ["culture"] },
  { keyword: "wet lab", tags: ["experimental"] },
  { keyword: "bench", tags: ["experimental"] },
  { keyword: "fieldwork", tags: ["experimental"] },
  { keyword: "sequencing", tags: ["computational"] },
  { keyword: "machine learning", tags: ["computational"] },
  { keyword: "bioinformatics", tags: ["computational"] },
  { keyword: "quantitative", tags: ["computational"] },
  { keyword: "protocol", tags: ["experimental", "learning"] },
  { keyword: "technique", tags: ["learning"] },
  { keyword: "methods", tags: ["learning"] },
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectTags(text: string): Set<string> {
  const normalized = text.toLowerCase();
  const tags = new Set<string>();
  for (const { keyword, tags: keywordTags } of CULTURE_SIGNALS) {
    const pattern = new RegExp(`\\b${escapeRegex(keyword.toLowerCase())}\\b`);
    if (pattern.test(normalized)) {
      for (const tag of keywordTags) tags.add(tag);
    }
  }
  return tags;
}

function addItem(
  groups: Map<string, string[]>,
  category: string,
  item: string,
) {
  const existing = groups.get(category) ?? [];
  if (!existing.includes(item)) {
    groups.set(category, [...existing, item]);
  }
}

function mapToGroups(map: Map<string, string[]>): GroupedReflectionItems[] {
  return Array.from(map.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}

function topLabDimensions(labProfile: LabProfile): Dimension[] {
  const normalized = getNormalizedScores(labProfile.scores);
  return [...DIMENSIONS].sort(
    (a, b) => normalized[b] - normalized[a],
  );
}

function buildGreenFlags(
  tags: Set<string>,
  topDimensions: Dimension[],
): GroupedReflectionItems[] {
  const groups = new Map<string, string[]>();

  addItem(
    groups,
    "Mentorship",
    "You may want to look for clear evidence of mentorship and structured training for new researchers.",
  );
  addItem(
    groups,
    "Mentorship",
    "It could be helpful to ask about regular meetings and feedback from the PI or senior lab members.",
  );

  if (tags.has("mentorship") || tags.has("training")) {
    addItem(
      groups,
      "Mentorship",
      "This description may suggest attention to training—you may want to look for opportunities to learn new skills with guidance.",
    );
  }

  addItem(
    groups,
    "Research Culture",
    "You may want to look for signs of open discussion, shared problem-solving, and mutual support among lab members.",
  );

  if (tags.has("culture")) {
    addItem(
      groups,
      "Research Culture",
      "This description may suggest a collaborative environment—it could be helpful to ask about teamwork and shared projects.",
    );
    addItem(
      groups,
      "Research Culture",
      "Interdisciplinary work may be part of this group's identity—you may want to learn how different perspectives are integrated.",
    );
  }

  addItem(
    groups,
    "Learning Opportunities",
    "You may want to look for exposure to multiple techniques, literature discussions, and chances to present work.",
  );

  if (tags.has("learning") || tags.has("experimental") || tags.has("computational")) {
    addItem(
      groups,
      "Learning Opportunities",
      "This description may suggest diverse methods—it could be helpful to ask what skills students typically develop over time.",
    );
  }

  if (tags.has("experimental")) {
    addItem(
      groups,
      "Learning Opportunities",
      "Hands-on techniques appear central here—you may want to look for structured bench or field training.",
    );
  }

  addItem(
    groups,
    "Project Design",
    "You may want to look for clearly articulated research questions and defined expectations for project scope.",
  );

  if (tags.has("project") || topDimensions.includes("theoryBuilding")) {
    addItem(
      groups,
      "Project Design",
      "This description may suggest mechanism- or hypothesis-driven work—it could be helpful to ask how projects are scoped for undergraduates.",
    );
    addItem(
      groups,
      "Project Design",
      "You may want to look for opportunities to take ownership of a meaningful piece of a larger project.",
    );
  }

  addItem(
    groups,
    "Communication",
    "You may want to look for transparent expectations and a culture where challenges can be discussed openly.",
  );

  if (tags.has("communication") || tags.has("culture")) {
    addItem(
      groups,
      "Communication",
      "This description may suggest regular group interaction—it could be helpful to ask how feedback is shared within the lab.",
    );
  }

  return mapToGroups(groups);
}

function buildChallenges(
  tags: Set<string>,
  topDimensions: Dimension[],
  labProfile: LabProfile,
): GroupedReflectionItems[] {
  const groups = new Map<string, string[]>();
  const normalized = getNormalizedScores(labProfile.scores);

  if (tags.has("timeline") || normalized.projectTempo < 40) {
    addItem(
      groups,
      "Project Structure",
      "This description may suggest long project timelines—students who prefer frequent milestones may wish to ask how progress is tracked.",
    );
  }

  addItem(
    groups,
    "Project Structure",
    "Ambiguous or evolving research questions can be intellectually rich but demanding—students may want to ask how direction is set when results are unexpected.",
  );

  if (tags.has("experimental") || normalized.experimentation >= 50) {
    addItem(
      groups,
      "Project Structure",
      "Significant troubleshooting may be part of daily work—students who prefer predictable progress may wish to ask how setbacks are typically handled.",
    );
  }

  if (normalized.experimentation >= 55 || tags.has("experimental")) {
    addItem(
      groups,
      "Research Style",
      "This description may suggest a heavy experimental workload—students may want to consider whether hands-on bench or field work matches their energy and schedule.",
    );
  }

  if (normalized.dataAnalysis >= 55 || tags.has("computational")) {
    addItem(
      groups,
      "Research Style",
      "This description may suggest substantial computational work—students may wish to ask about the quantitative skills expected and how they are developed.",
    );
  }

  if (tags.has("autonomy") || normalized.humanInteraction < 40) {
    addItem(
      groups,
      "Research Style",
      "A high degree of independent work may be expected—students who enjoy collaborative work may want to learn more about day-to-day team interactions.",
    );
  }

  if (tags.has("pace") || normalized.projectTempo >= 55) {
    addItem(
      groups,
      "Work Environment",
      "This description may suggest a rapid pace—students may wish to ask how deadlines and priorities are managed during busy periods.",
    );
  }

  if (!tags.has("culture") && normalized.humanInteraction < 45) {
    addItem(
      groups,
      "Work Environment",
      "Limited collaboration may be implied—students who prefer frequent feedback may wish to ask how mentoring is structured outside of formal meetings.",
    );
  }

  if (tags.has("experimental") || tags.has("computational")) {
    addItem(
      groups,
      "Learning Curve",
      "Specialized techniques may require an extended training period—students may want to ask how long it typically takes to contribute independently.",
    );
  }

  if (topDimensions.includes("theoryBuilding") || tags.has("project")) {
    addItem(
      groups,
      "Learning Curve",
      "Complex literature may be part of the field—students may wish to ask how the lab supports newcomers in building background knowledge.",
    );
  }

  if (groups.size === 0) {
    addItem(
      groups,
      "General Considerations",
      "Every research environment involves tradeoffs not visible in a short description—students may benefit from speaking with current lab members about their experiences.",
    );
  }

  return mapToGroups(groups);
}

function buildQuestions(
  tags: Set<string>,
  topDimensions: Dimension[],
  labProfile: LabProfile,
): GroupedReflectionItems[] {
  const groups = new Map<string, string[]>();
  const normalized = getNormalizedScores(labProfile.scores);

  addItem(
    groups,
    "Mentorship",
    "How often do students meet with the PI, and what do those meetings typically involve?",
  );
  addItem(
    groups,
    "Mentorship",
    "What does training look like for new researchers joining the lab?",
  );

  if (tags.has("autonomy") || normalized.humanInteraction < 45) {
    addItem(
      groups,
      "Mentorship",
      "How independent are undergraduate researchers expected to be, and what support is available when they get stuck?",
    );
  }

  addItem(
    groups,
    "Research Experience",
    "What does a typical week look like for an undergraduate in this lab?",
  );
  addItem(
    groups,
    "Research Experience",
    "How long does it usually take before students begin contributing meaningfully to projects?",
  );

  if (tags.has("experimental")) {
    addItem(
      groups,
      "Research Experience",
      "What hands-on skills do students learn most often in this group?",
    );
  }

  if (tags.has("computational")) {
    addItem(
      groups,
      "Research Experience",
      "What computational or analytical tools do students use regularly, and is prior experience required?",
    );
  }

  addItem(
    groups,
    "Lab Culture",
    "How do lab members collaborate on shared goals versus independent work?",
  );
  addItem(
    groups,
    "Lab Culture",
    "Are there regular lab meetings, journal clubs, or other forums for discussion?",
  );

  if (tags.has("culture")) {
    addItem(
      groups,
      "Lab Culture",
      "How are challenges or unexpected results discussed within the group?",
    );
  }

  addItem(
    groups,
    "Project Expectations",
    "Do undergraduates typically work on independent projects, or contribute to larger team efforts?",
  );
  addItem(
    groups,
    "Project Expectations",
    "How are projects assigned, and how much flexibility do students have in shaping their work?",
  );

  if (tags.has("timeline")) {
    addItem(
      groups,
      "Project Expectations",
      "How are long-term projects broken into manageable steps for students still learning the field?",
    );
  }

  return mapToGroups(groups);
}

function buildSummary(
  tags: Set<string>,
  topDimensions: Dimension[],
  labProfile: LabProfile,
): string[] {
  const normalized = getNormalizedScores(labProfile.scores);
  const paragraphs: string[] = [];

  paragraphs.push(
    "Every research environment involves tradeoffs. A single description cannot capture the full texture of daily life in a lab, but it can suggest themes worth exploring further.",
  );

  const themes: string[] = [];

  if (normalized.experimentation >= 50 || tags.has("experimental")) {
    themes.push("hands-on technical development");
  }
  if (normalized.dataAnalysis >= 50 || tags.has("computational")) {
    themes.push("quantitative and analytical work");
  }
  if (normalized.theoryBuilding >= 50 || tags.has("project")) {
    themes.push("conceptual and mechanism-driven inquiry");
  }
  if (tags.has("culture") || normalized.humanInteraction >= 50) {
    themes.push("collaborative research culture");
  }
  if (tags.has("timeline") || normalized.projectTempo < 45) {
    themes.push("long-term scientific exploration");
  }
  if (tags.has("pace") || normalized.projectTempo >= 55) {
    themes.push("a fast-moving project rhythm");
  }

  if (themes.length > 0) {
    const themeList =
      themes.length === 1
        ? themes[0]
        : `${themes.slice(0, -1).join(", ")} and ${themes[themes.length - 1]}`;
    paragraphs.push(
      `This lab description may suggest opportunities for ${themeList}. Students considering this environment may benefit from learning more about mentorship style, project ownership, and day-to-day expectations before making a decision.`,
    );
  } else {
    paragraphs.push(
      "Students considering this environment may benefit from learning more about mentorship style, project ownership, and day-to-day expectations before making a decision.",
    );
  }

  paragraphs.push(
    "The goal is not to determine whether a lab is \"good\" or \"bad\", but whether it aligns with your interests, learning style, and goals. Thoughtful questions—asked of the PI, graduate students, and yourself—are often more valuable than any automated assessment.",
  );

  return paragraphs;
}

export function generateEnvironmentReflection(
  text: string,
  labProfile: LabProfile,
): EnvironmentReflectionResult {
  const tags = detectTags(text);
  const topDimensions = topLabDimensions(labProfile).slice(0, 2);

  return {
    greenFlags: buildGreenFlags(tags, topDimensions),
    challenges: buildChallenges(tags, topDimensions, labProfile),
    questionsToAsk: buildQuestions(tags, topDimensions, labProfile),
    summary: buildSummary(tags, topDimensions, labProfile),
  };
}
