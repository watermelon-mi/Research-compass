import type {
  Archetype,
  ArchetypeId,
  Dimension,
  DimensionScores,
} from "./types";
import { DIMENSIONS } from "./types";
import { QUESTIONS } from "./questions";

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  mechanismSeeker: {
    id: "mechanismSeeker",
    name: "The Mechanism Seeker",
    tagline:
      "You tend to be drawn toward understanding why things work the way they do.",
    description:
      "Mechanism Seekers often find satisfaction in peeling back layers of complexity. You may gravitate toward causal questions, targeted investigations, and connecting empirical findings to conceptual explanations. For you, research can feel most meaningful when it builds understanding—not merely collects observations.",
    coreMotivation: "Understanding why things work.",
    strengths: [
      "Deep curiosity about causes and underlying processes",
      "Strong conceptual thinking and hypothesis formation",
      "Patience with complex systems that unfold over time",
      "Ability to connect experimental results to broader theory",
    ],
    challenges: [
      "May become frustrated by purely descriptive or applied work",
      "Might over-focus on mechanistic details before gathering enough evidence",
      "Could find fast-paced, output-driven environments less satisfying",
      "May need reminders to translate deep understanding into clear communication",
    ],
    environments: [
      "Genetics and molecular biology",
      "Cell and developmental biology",
      "Neuroscience with mechanistic focus",
      "Biophysics and structural biology",
    ],
    reflectionQuestions: [
      "Do you enjoy asking \"why\" more than \"what\"?",
      "Do mechanisms excite you more than immediate applications?",
      "Would you find satisfaction in a project that takes months to reveal a single causal pathway?",
      "How do you respond when an experiment works but the underlying reason remains unclear?",
    ],
  },
  explorer: {
    id: "explorer",
    name: "The Explorer",
    tagline:
      "You tend to be driven by curiosity, discovery, and the thrill of the unknown.",
    description:
      "Explorers often thrive when research feels like an adventure. You may be energized by hands-on investigation, rapid iteration, and the possibility of unexpected findings. Learning by doing—and adjusting course when new evidence appears—may feel natural to you.",
    coreMotivation: "Discovering what lies beyond the known.",
    strengths: [
      "Adaptability to new methods and surprising results",
      "Energy for hands-on investigation across topics",
      "Comfort navigating ambiguity and changing direction",
      "Openness to serendipitous findings",
    ],
    challenges: [
      "May find long, single-thread projects draining",
      "Might spread attention across too many parallel ideas",
      "Could benefit from structured documentation and follow-through",
      "May need support maintaining depth when variety is abundant",
    ],
    environments: [
      "Field ecology and environmental science",
      "Pilot labs with rapid iteration cycles",
      "Interdisciplinary discovery-oriented groups",
      "Exploratory methods development teams",
    ],
    reflectionQuestions: [
      "Do you feel most alive when each week brings something new?",
      "How do you balance the excitement of novelty with the need for depth?",
      "Would you enjoy a lab where projects pivot frequently based on findings?",
      "What helps you stay focused when many directions seem interesting?",
    ],
  },
  analyst: {
    id: "analyst",
    name: "The Analyst",
    tagline:
      "You tend to find clarity in patterns, evidence, and rigorous reasoning.",
    description:
      "Analysts are often most at home when working with data—finding structure in complexity, testing claims with evidence, and building reproducible arguments. You may value precision and serve as someone who helps a team see what the evidence actually supports.",
    coreMotivation: "Finding truth through evidence and pattern.",
    strengths: [
      "Skill at extracting meaning from complex datasets",
      "Commitment to reproducibility and systematic methodology",
      "Keen eye for trends others might overlook",
      "Comfort with quantitative reasoning and logical argument",
    ],
    challenges: [
      "May prefer computational work over bench experiments",
      "Might be skeptical of conclusions lacking quantitative support",
      "Could need encouragement to engage in open-ended exploration",
      "May undervalue qualitative insights that resist easy measurement",
    ],
    environments: [
      "Computational biology and bioinformatics",
      "Data science within academic research",
      "Epidemiology and biostatistics",
      "Quantitative social and behavioral science",
    ],
    reflectionQuestions: [
      "Do you trust data to resolve questions that intuition cannot?",
      "How do you respond when the numbers tell a story you did not expect?",
      "Would you enjoy spending most days at a computer rather than a bench?",
      "What role does intuition play in your analytical process?",
    ],
  },
  builder: {
    id: "builder",
    name: "The Builder",
    tagline:
      "You tend to enjoy creating tools, methods, and tangible solutions.",
    description:
      "Builders are often motivated by making things work. Whether prototyping a protocol, engineering a device, or developing a pipeline, you may find meaning in concrete progress. Environments where ideas move from concept to implementation relatively quickly might feel especially rewarding.",
    coreMotivation: "Making ideas real and functional.",
    strengths: [
      "Motivation from concrete milestones and visible progress",
      "Skill translating ideas into working systems or protocols",
      "Comfort with iterative build-test-refine cycles",
      "Practical problem-solving under real constraints",
    ],
    challenges: [
      "May undervalue theoretical groundwork before building",
      "Might feel restless during extended planning or literature review",
      "Could benefit from deepening analytical foundations over time",
      "May need reminders to step back and question whether the build addresses the right problem",
    ],
    environments: [
      "Biomedical engineering and device development",
      "Methods and protocol development labs",
      "Applied science with prototyping culture",
      "Software and pipeline engineering for research",
    ],
    reflectionQuestions: [
      "Do you feel more satisfied by a working prototype than a polished theory?",
      "How do you handle projects where progress is slow and invisible?",
      "Would you enjoy a lab that celebrates deliverables and milestones?",
      "What happens when a tool works but the underlying question remains open?",
    ],
  },
  collaborator: {
    id: "collaborator",
    name: "The Collaborator",
    tagline:
      "You tend to do your best work alongside others and for others.",
    description:
      "Collaborators often find research most meaningful when it connects people—through teamwork, community engagement, or work that touches human lives directly. You may excel at communication, coordination, and bridging perspectives across disciplines and experience levels.",
    coreMotivation: "Connecting research to people and shared purpose.",
    strengths: [
      "Strong communication across disciplines and experience levels",
      "Energy from team brainstorming and shared problem-solving",
      "Natural bridge between technical and human concerns",
      "Empathy for how research affects participants and communities",
    ],
    challenges: [
      "May find highly isolated research roles less energizing",
      "Might prioritize group harmony over constructive disagreement",
      "Could need intentional time for deep, independent analytical work",
      "May absorb team stress if boundaries between roles are unclear",
    ],
    environments: [
      "Clinical and translational research",
      "Community-based participatory research",
      "Psychology and behavioral science with human subjects",
      "Public health and health policy groups",
    ],
    reflectionQuestions: [
      "Do you think more clearly when you can talk ideas through with others?",
      "How important is it that your research directly helps specific people?",
      "Would you enjoy a lab with daily interaction and shared meetings?",
      "How do you maintain focus when collaboration demands are high?",
    ],
  },
};

const EMPTY_SCORES = (): DimensionScores => ({
  experimentation: 0,
  dataAnalysis: 0,
  theoryBuilding: 0,
  projectTempo: 0,
  humanInteraction: 0,
});

export function getMaxDimensionScores(): DimensionScores {
  const max = EMPTY_SCORES();

  for (const question of QUESTIONS) {
    const questionMax = EMPTY_SCORES();
    for (const option of question.options) {
      for (const dimension of DIMENSIONS) {
        const weight = option.weights[dimension] ?? 0;
        questionMax[dimension] = Math.max(questionMax[dimension], weight);
      }
    }
    for (const dimension of DIMENSIONS) {
      max[dimension] += questionMax[dimension];
    }
  }

  return max;
}

const MAX_SCORES = getMaxDimensionScores();

export function calculateScores(
  answers: Record<number, number>,
): DimensionScores {
  const scores = EMPTY_SCORES();

  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = QUESTIONS.find((q) => q.id === Number(questionId));
    const option = question?.options[optionIndex];
    if (!option) continue;

    for (const dimension of DIMENSIONS) {
      scores[dimension] += option.weights[dimension] ?? 0;
    }
  }

  return scores;
}

export function normalizeScore(raw: number, dimension: Dimension): number {
  const max = MAX_SCORES[dimension];
  if (max === 0) return 0;
  return Math.round((raw / max) * 100);
}

export function getNormalizedScores(scores: DimensionScores): DimensionScores {
  return {
    experimentation: normalizeScore(scores.experimentation, "experimentation"),
    dataAnalysis: normalizeScore(scores.dataAnalysis, "dataAnalysis"),
    theoryBuilding: normalizeScore(scores.theoryBuilding, "theoryBuilding"),
    projectTempo: normalizeScore(scores.projectTempo, "projectTempo"),
    humanInteraction: normalizeScore(
      scores.humanInteraction,
      "humanInteraction",
    ),
  };
}

function composite(
  scores: DimensionScores,
  weights: Partial<Record<Dimension, number>>,
): number {
  return Object.entries(weights).reduce(
    (sum, [dim, weight]) => sum + scores[dim as Dimension] * (weight ?? 0),
    0,
  );
}

export function determineArchetype(scores: DimensionScores): Archetype {
  const normalized = getNormalizedScores(scores);

  const rankings: { id: ArchetypeId; score: number }[] = [
    {
      id: "mechanismSeeker",
      score: composite(normalized, {
        experimentation: 0.45,
        theoryBuilding: 0.45,
        dataAnalysis: 0.1,
      }),
    },
    {
      id: "explorer",
      score: composite(normalized, {
        experimentation: 0.4,
        projectTempo: 0.4,
        theoryBuilding: 0.1,
        humanInteraction: 0.1,
      }),
    },
    {
      id: "analyst",
      score: composite(normalized, {
        dataAnalysis: 0.6,
        theoryBuilding: 0.2,
        experimentation: 0.2,
      }),
    },
    {
      id: "builder",
      score: composite(normalized, {
        projectTempo: 0.4,
        experimentation: 0.35,
        dataAnalysis: 0.15,
        humanInteraction: 0.1,
      }),
    },
    {
      id: "collaborator",
      score: composite(normalized, {
        humanInteraction: 0.6,
        projectTempo: 0.2,
        experimentation: 0.1,
        dataAnalysis: 0.1,
      }),
    },
  ];

  rankings.sort((a, b) => b.score - a.score);
  return ARCHETYPES[rankings[0].id];
}

export function getTopDimensions(
  scores: DimensionScores,
  count = 2,
): Dimension[] {
  const normalized = getNormalizedScores(scores);
  return (Object.entries(normalized) as [Dimension, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([dim]) => dim);
}

export function getLowDimensions(
  scores: DimensionScores,
  count = 2,
): Dimension[] {
  const normalized = getNormalizedScores(scores);
  return (Object.entries(normalized) as [Dimension, number][])
    .sort(([, a], [, b]) => a - b)
    .slice(0, count)
    .map(([dim]) => dim);
}
