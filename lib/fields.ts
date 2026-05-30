import type { Dimension, DimensionScores, FieldRecommendation } from "./types";
import { getNormalizedScores } from "./scoring";

interface FieldProfile {
  field: Omit<FieldRecommendation, "appealReason">;
  weights: Record<Dimension, number>;
}

const FIELD_PROFILES: FieldProfile[] = [
  {
    field: {
      id: "genetics",
      name: "Genetics",
      description:
        "The study of genes, heredity, and variation across organisms—from molecular mechanisms to population-level patterns.",
      commonActivities: [
        "Designing genetic screens and crosses",
        "Analyzing sequencing data",
        "Reading literature on gene function",
        "Presenting findings at lab meetings",
      ],
      typicalQuestions: [
        "How does this gene influence development or disease?",
        "What is the molecular mechanism of this inherited trait?",
        "How do genetic variants interact with the environment?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Lab meeting and project updates" },
        { time: "10:00", activity: "Prepare samples for sequencing" },
        { time: "12:00", activity: "Literature review on gene pathways" },
        { time: "14:00", activity: "Analyze variant data on the computer" },
        { time: "16:00", activity: "Discuss results with mentor" },
        { time: "17:00", activity: "Plan next week's experiments" },
      ],
    },
    weights: {
      experimentation: 0.3,
      theoryBuilding: 0.3,
      dataAnalysis: 0.2,
      projectTempo: 0.1,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "molecular-biology",
      name: "Molecular Biology",
      description:
        "Investigation of biological processes at the molecular level—DNA, RNA, proteins, and their interactions within cells.",
      commonActivities: [
        "Running PCR, Western blots, and assays",
        "Maintaining cell cultures",
        "Troubleshooting protocols",
        "Documenting experimental conditions",
      ],
      typicalQuestions: [
        "How does this protein regulate cell signaling?",
        "What happens when this pathway is disrupted?",
        "Can we reproduce this result under different conditions?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Check cell cultures and prepare reagents" },
        { time: "10:30", activity: "Run experiments at the bench" },
        { time: "13:00", activity: "Lunch and informal discussion with labmates" },
        { time: "14:00", activity: "Continue bench work and data collection" },
        { time: "16:00", activity: "Record results and update lab notebook" },
        { time: "17:00", activity: "Read a paper related to today's work" },
      ],
    },
    weights: {
      experimentation: 0.4,
      theoryBuilding: 0.25,
      dataAnalysis: 0.15,
      projectTempo: 0.1,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "developmental-biology",
      name: "Developmental Biology",
      description:
        "Study of how organisms grow and develop—from embryonic patterning to tissue formation and regeneration.",
      commonActivities: [
        "Observing developmental stages under microscopy",
        "Manipulating gene expression in model organisms",
        "Imaging tissue samples",
        "Integrating observations with developmental theory",
      ],
      typicalQuestions: [
        "How do cells know where to go during development?",
        "What signals coordinate tissue formation?",
        "What happens when a developmental gene is altered?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Microscopy session with live samples" },
        { time: "11:00", activity: "Image analysis and annotation" },
        { time: "13:00", activity: "Journal club or seminar" },
        { time: "14:30", activity: "Bench work preparing next experiment" },
        { time: "16:30", activity: "Write up observations and hypotheses" },
        { time: "17:30", activity: "One-on-one with mentor" },
      ],
    },
    weights: {
      experimentation: 0.35,
      theoryBuilding: 0.3,
      dataAnalysis: 0.15,
      projectTempo: 0.1,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "neuroscience",
      name: "Neuroscience",
      description:
        "Exploration of the nervous system—how brains and neural circuits produce behavior, cognition, and disease.",
      commonActivities: [
        "Conducting behavioral or electrophysiology experiments",
        "Analyzing neural imaging data",
        "Reviewing literature on brain function",
        "Collaborating across biology and psychology",
      ],
      typicalQuestions: [
        "How does this circuit produce a specific behavior?",
        "What changes in the brain underlie learning or memory?",
        "How might we intervene in a neurological disorder?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Lab meeting and experiment planning" },
        { time: "10:00", activity: "Experimental work with animal models or recordings" },
        { time: "13:00", activity: "Data collection and preliminary analysis" },
        { time: "15:00", activity: "Literature review on neural mechanisms" },
        { time: "17:00", activity: "Discussion with mentor about results" },
      ],
    },
    weights: {
      experimentation: 0.3,
      theoryBuilding: 0.25,
      dataAnalysis: 0.2,
      projectTempo: 0.1,
      humanInteraction: 0.15,
    },
  },
  {
    field: {
      id: "psychology",
      name: "Psychology",
      description:
        "Scientific study of mind and behavior—often through experiments, surveys, observations, and statistical analysis.",
      commonActivities: [
        "Designing and running studies with participants",
        "Collecting survey or behavioral data",
        "Statistical analysis of results",
        "Writing up findings for publication",
      ],
      typicalQuestions: [
        "What factors influence this behavior or mental process?",
        "Can we measure this construct reliably?",
        "How do individual differences affect outcomes?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Run participant sessions in the lab" },
        { time: "11:00", activity: "Debrief participants and organize data" },
        { time: "13:00", activity: "Team meeting on study design" },
        { time: "14:00", activity: "Analyze data and update figures" },
        { time: "16:00", activity: "Read recent papers in the subfield" },
        { time: "17:00", activity: "Draft methods section for a report" },
      ],
    },
    weights: {
      humanInteraction: 0.35,
      dataAnalysis: 0.3,
      theoryBuilding: 0.2,
      experimentation: 0.1,
      projectTempo: 0.05,
    },
  },
  {
    field: {
      id: "public-health",
      name: "Public Health",
      description:
        "Research focused on health at the population level—prevention, epidemiology, policy, and community wellbeing.",
      commonActivities: [
        "Analyzing health survey and epidemiological data",
        "Engaging with communities and stakeholders",
        "Reviewing policy and intervention literature",
        "Communicating findings to diverse audiences",
      ],
      typicalQuestions: [
        "What factors drive health disparities in this population?",
        "How effective is this intervention at scale?",
        "What data would inform better public health policy?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Review epidemiological datasets" },
        { time: "10:30", activity: "Team meeting on community outreach" },
        { time: "12:00", activity: "Stakeholder call or field visit" },
        { time: "14:00", activity: "Statistical modeling and visualization" },
        { time: "16:00", activity: "Draft report section for collaborators" },
        { time: "17:00", activity: "Plan next phase of data collection" },
      ],
    },
    weights: {
      humanInteraction: 0.35,
      dataAnalysis: 0.35,
      theoryBuilding: 0.1,
      experimentation: 0.1,
      projectTempo: 0.1,
    },
  },
  {
    field: {
      id: "data-science",
      name: "Data Science",
      description:
        "Application of computational and statistical methods to extract insight from complex datasets across domains.",
      commonActivities: [
        "Cleaning and exploring large datasets",
        "Building and validating models",
        "Creating visualizations and reports",
        "Collaborating with domain experts",
      ],
      typicalQuestions: [
        "What patterns exist in this dataset that we haven't noticed?",
        "Can we predict this outcome from available features?",
        "How robust is this model across different conditions?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Review data pipeline outputs" },
        { time: "10:00", activity: "Exploratory analysis and visualization" },
        { time: "12:00", activity: "Sync with research collaborators" },
        { time: "14:00", activity: "Model training and evaluation" },
        { time: "16:00", activity: "Document methods and results" },
        { time: "17:00", activity: "Read about new analytical techniques" },
      ],
    },
    weights: {
      dataAnalysis: 0.5,
      theoryBuilding: 0.15,
      projectTempo: 0.15,
      experimentation: 0.1,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "computational-biology",
      name: "Computational Biology",
      description:
        "Integration of computational methods with biological questions—modeling, simulation, and large-scale data analysis.",
      commonActivities: [
        "Analyzing sequencing and omics datasets",
        "Building analysis pipelines",
        "Reading recent computational methods papers",
        "Collaborating with experimental labs",
      ],
      typicalQuestions: [
        "What biological insight emerges from this dataset?",
        "Can we model this system computationally?",
        "How do we validate predictions experimentally?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Read recent papers in the field" },
        { time: "10:00", activity: "Analyze sequencing data" },
        { time: "12:00", activity: "Team meeting with experimental collaborators" },
        { time: "14:00", activity: "Build and test analysis pipelines" },
        { time: "16:00", activity: "Review results and refine approach" },
        { time: "17:00", activity: "Plan next computational experiments" },
      ],
    },
    weights: {
      dataAnalysis: 0.4,
      theoryBuilding: 0.25,
      experimentation: 0.15,
      projectTempo: 0.1,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "bioinformatics",
      name: "Bioinformatics",
      description:
        "Development and application of computational tools to store, analyze, and interpret biological data.",
      commonActivities: [
        "Writing scripts and pipelines for data processing",
        "Database management and curation",
        "Algorithm development and benchmarking",
        "Supporting experimental researchers with analysis",
      ],
      typicalQuestions: [
        "How can we process this data type efficiently?",
        "What does this sequence or structure reveal biologically?",
        "Can we automate this repetitive analysis workflow?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Debug and optimize analysis pipeline" },
        { time: "10:30", activity: "Process new dataset batch" },
        { time: "12:00", activity: "Meeting with wet-lab collaborators" },
        { time: "14:00", activity: "Develop visualization for results" },
        { time: "16:00", activity: "Document pipeline for lab use" },
        { time: "17:00", activity: "Explore new bioinformatics tools" },
      ],
    },
    weights: {
      dataAnalysis: 0.45,
      experimentation: 0.15,
      theoryBuilding: 0.15,
      projectTempo: 0.15,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "biomedical-engineering",
      name: "Biomedical Engineering",
      description:
        "Application of engineering principles to solve problems in medicine and biology—devices, materials, and systems.",
      commonActivities: [
        "Prototyping devices or materials",
        "Testing prototypes in lab settings",
        "Iterating designs based on results",
        "Collaborating with clinicians and biologists",
      ],
      typicalQuestions: [
        "How can we build a tool that solves this clinical problem?",
        "What material or design performs best under these conditions?",
        "How do we translate this prototype toward real-world use?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Prototype assembly and calibration" },
        { time: "10:30", activity: "Run performance tests" },
        { time: "12:00", activity: "Design review with team" },
        { time: "14:00", activity: "Analyze test data and revise design" },
        { time: "16:00", activity: "Documentation and iteration planning" },
        { time: "17:00", activity: "Literature on similar devices" },
      ],
    },
    weights: {
      experimentation: 0.3,
      projectTempo: 0.3,
      dataAnalysis: 0.2,
      theoryBuilding: 0.1,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "ecology",
      name: "Ecology",
      description:
        "Study of interactions among organisms and their environments—from individual species to entire ecosystems.",
      commonActivities: [
        "Field sampling and observation",
        "Statistical modeling of ecological data",
        "Literature synthesis on ecosystems",
        "Presenting findings to interdisciplinary audiences",
      ],
      typicalQuestions: [
        "How does this species interact with its environment?",
        "What happens to this ecosystem under changing conditions?",
        "How do populations respond over time and space?",
      ],
      exampleDay: [
        { time: "8:00", activity: "Travel to field site and collect samples" },
        { time: "11:00", activity: "Process samples and record observations" },
        { time: "13:00", activity: "Lunch and field notes review" },
        { time: "14:00", activity: "Data entry and preliminary analysis" },
        { time: "16:00", activity: "Literature on related ecological systems" },
        { time: "17:00", activity: "Plan next field visit" },
      ],
    },
    weights: {
      experimentation: 0.35,
      dataAnalysis: 0.25,
      theoryBuilding: 0.15,
      projectTempo: 0.15,
      humanInteraction: 0.1,
    },
  },
  {
    field: {
      id: "systems-biology",
      name: "Systems Biology",
      description:
        "Holistic study of biological systems through integration of experiments, modeling, and large-scale data.",
      commonActivities: [
        "Integrating multi-omics datasets",
        "Building network and systems models",
        "Designing experiments to test model predictions",
        "Cross-disciplinary collaboration",
      ],
      typicalQuestions: [
        "How do components of this system interact as a whole?",
        "What emergent behavior arises from these interactions?",
        "Can we predict system response to perturbation?",
      ],
      exampleDay: [
        { time: "9:00", activity: "Integrate new dataset into system model" },
        { time: "10:30", activity: "Simulation and prediction testing" },
        { time: "12:00", activity: "Joint meeting with experimental lab" },
        { time: "14:00", activity: "Refine model based on new data" },
        { time: "16:00", activity: "Write up integrative findings" },
        { time: "17:00", activity: "Review systems biology literature" },
      ],
    },
    weights: {
      theoryBuilding: 0.3,
      dataAnalysis: 0.3,
      experimentation: 0.2,
      projectTempo: 0.1,
      humanInteraction: 0.1,
    },
  },
];

const APPEAL_PHRASES: Partial<Record<Dimension, string>> = {
  experimentation:
    "your apparent preference for hands-on investigation and practical work",
  dataAnalysis:
    "your tendency toward quantitative reasoning and pattern-finding",
  theoryBuilding:
    "your interest in mechanisms, concepts, and explanatory depth",
  projectTempo:
    "your comfort with the pace and rhythm of iterative research",
  humanInteraction:
    "your inclination toward collaborative and people-centered inquiry",
};

function profileAlignment(
  user: DimensionScores,
  field: Record<Dimension, number>,
): number {
  return Object.entries(field).reduce(
    (sum, [dim, weight]) => sum + user[dim as Dimension] * weight,
    0,
  );
}

function buildAppealReason(
  normalized: DimensionScores,
  weights: Record<Dimension, number>,
): string {
  const aligned = (Object.entries(weights) as [Dimension, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([dim]) => APPEAL_PHRASES[dim])
    .filter(Boolean);

  if (aligned.length >= 2) {
    return `This field may resonate with ${aligned[0]} and ${aligned[1]}.`;
  }
  return `This field may align with dimensions that appear prominently in your profile.`;
}

export function recommendFields(
  scores: DimensionScores,
  limit = 5,
): FieldRecommendation[] {
  const normalized = getNormalizedScores(scores);

  return FIELD_PROFILES.map(({ field, weights }) => ({
    ...field,
    appealReason: buildAppealReason(normalized, weights),
    score: profileAlignment(normalized, weights),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score: _, ...field }) => field);
}
