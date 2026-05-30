import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "If you were given unlimited funding for a research project, what would excite you most?",
    options: [
      {
        label: "Designing a series of experiments to uncover how a biological system works",
        weights: { experimentation: 4, theoryBuilding: 2 },
      },
      {
        label: "Building a computational pipeline to find patterns in a massive dataset",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Developing a new theoretical framework for an unresolved question",
        weights: { theoryBuilding: 4, dataAnalysis: 1 },
      },
      {
        label: "Leading a community-based study that directly involves participants",
        weights: { humanInteraction: 4, experimentation: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "Your experiment produces a result that contradicts your hypothesis. What is your first instinct?",
    options: [
      {
        label: "Redesign the experiment and run it again under different conditions",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "Examine the data carefully for errors, outliers, or hidden patterns",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Revisit the underlying assumptions and revise your model",
        weights: { theoryBuilding: 4, dataAnalysis: 2 },
      },
      {
        label: "Discuss the finding with colleagues to interpret what it might mean",
        weights: { humanInteraction: 3, theoryBuilding: 2 },
      },
    ],
  },
  {
    id: 3,
    text: "A mentor offers you two summer research opportunities. Which draws you in?",
    options: [
      {
        label: "A wet-lab position running protocols and collecting samples daily",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "A computational role analyzing genomic sequences from home",
        weights: { dataAnalysis: 4, experimentation: 1 },
      },
      {
        label: "A theory group exploring mathematical models of neural circuits",
        weights: { theoryBuilding: 4, dataAnalysis: 2 },
      },
      {
        label: "A clinical research team conducting interviews with patients",
        weights: { humanInteraction: 4, experimentation: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "You have been stuck on a research problem for two weeks. What do you do?",
    options: [
      {
        label: "Try a completely different experimental approach this afternoon",
        weights: { experimentation: 3, projectTempo: 3 },
      },
      {
        label: "Step back and systematically review all the data collected so far",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Write out the problem from first principles to find logical gaps",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "Schedule a meeting with your mentor or labmates to think aloud together",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "You finish reading a fascinating paper. Which section do you find yourself revisiting?",
    options: [
      {
        label: "The methods — how they designed and executed the experiments",
        weights: { experimentation: 4, theoryBuilding: 1 },
      },
      {
        label: "The figures and statistical analyses",
        weights: { dataAnalysis: 4, experimentation: 1 },
      },
      {
        label: "The discussion — how the authors connect findings to broader theory",
        weights: { theoryBuilding: 4, dataAnalysis: 1 },
      },
      {
        label: "The implications for real people or communities affected",
        weights: { humanInteraction: 3, theoryBuilding: 2 },
      },
    ],
  },
  {
    id: 6,
    text: "Imagine your ideal research week. How is it structured?",
    options: [
      {
        label: "Daily lab work with quick experiments and immediate feedback",
        weights: { experimentation: 3, projectTempo: 3 },
      },
      {
        label: "Long blocks of coding and analysis with minimal interruptions",
        weights: { dataAnalysis: 4, projectTempo: 1 },
      },
      {
        label: "Reading, writing, and refining ideas with occasional deep dives",
        weights: { theoryBuilding: 3, projectTempo: 2 },
      },
      {
        label: "Meetings, interviews, and collaborative sessions with your team",
        weights: { humanInteraction: 4, projectTempo: 2 },
      },
    ],
  },
  {
    id: 7,
    text: "You are choosing a thesis topic. Which criterion matters most to you?",
    options: [
      {
        label: "It lets me work hands-on with techniques I want to master",
        weights: { experimentation: 4, projectTempo: 1 },
      },
      {
        label: "It involves rich datasets I can explore from multiple angles",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "It addresses a fundamental 'why' question in the field",
        weights: { theoryBuilding: 4, experimentation: 1 },
      },
      {
        label: "It has clear relevance to people's lives or communities",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "In a group research project, which role do you naturally take?",
    options: [
      {
        label: "The person who sets up experiments and keeps protocols running",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "The person who cleans data and builds visualizations",
        weights: { dataAnalysis: 4, humanInteraction: 1 },
      },
      {
        label: "The person who connects findings to the big-picture narrative",
        weights: { theoryBuilding: 4, humanInteraction: 1 },
      },
      {
        label: "The person who coordinates the team and communicates with stakeholders",
        weights: { humanInteraction: 4, projectTempo: 2 },
      },
    ],
  },
  {
    id: 9,
    text: "You are preparing to present your research. What do you spend the most time on?",
    options: [
      {
        label: "Demonstrating the experimental setup and raw results",
        weights: { experimentation: 4, theoryBuilding: 1 },
      },
      {
        label: "Crafting clear charts and statistical summaries",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Explaining the conceptual framework and its significance",
        weights: { theoryBuilding: 4, humanInteraction: 1 },
      },
      {
        label: "Anticipating audience questions and tailoring your message",
        weights: { humanInteraction: 4, dataAnalysis: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "Mid-experiment, a critical piece of equipment fails. How do you respond?",
    options: [
      {
        label: "Improvise an alternative setup and keep collecting data today",
        weights: { experimentation: 4, projectTempo: 3 },
      },
      {
        label: "Use the downtime to analyze data you have already gathered",
        weights: { dataAnalysis: 4, projectTempo: 1 },
      },
      {
        label: "Use the pause to rethink whether your approach is the right one",
        weights: { theoryBuilding: 3, projectTempo: 2 },
      },
      {
        label: "Reach out to others who may have faced the same issue before",
        weights: { humanInteraction: 3, experimentation: 2 },
      },
    ],
  },
  {
    id: 11,
    text: "A conference talk inspires you. What resonates most?",
    options: [
      {
        label: "The elegant experimental design that made the discovery possible",
        weights: { experimentation: 4, theoryBuilding: 2 },
      },
      {
        label: "The surprising pattern that emerged from the data",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "The new theoretical lens for understanding an old problem",
        weights: { theoryBuilding: 4, experimentation: 1 },
      },
      {
        label: "The speaker's story about how the work impacted people's lives",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 12,
    text: "You have one unexpected hour in the lab or at your desk. How do you use it?",
    options: [
      {
        label: "Start a small pilot experiment you have been curious about",
        weights: { experimentation: 4, projectTempo: 3 },
      },
      {
        label: "Explore a dataset with a new analysis script",
        weights: { dataAnalysis: 4, projectTempo: 2 },
      },
      {
        label: "Sketch out connections between ideas in your research notebook",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "Catch up with a labmate or read notes from a recent interview",
        weights: { humanInteraction: 3, projectTempo: 2 },
      },
    ],
  },
  {
    id: 13,
    text: "A friend describes an intriguing research idea. What is your first question?",
    options: [
      {
        label: "How would you test that experimentally?",
        weights: { experimentation: 4, theoryBuilding: 2 },
      },
      {
        label: "What data would you need, and how would you analyze it?",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "What existing theory does this extend or challenge?",
        weights: { theoryBuilding: 4, dataAnalysis: 1 },
      },
      {
        label: "Who would be affected, and how would you involve them?",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 14,
    text: "Your lab is adopting a new research method. What is your approach?",
    options: [
      {
        label: "Jump in and learn by doing, iterating as you go",
        weights: { experimentation: 3, projectTempo: 3 },
      },
      {
        label: "Study the documentation and benchmark it against existing tools",
        weights: { dataAnalysis: 3, theoryBuilding: 2 },
      },
      {
        label: "Understand the theoretical basis before applying it",
        weights: { theoryBuilding: 4, experimentation: 1 },
      },
      {
        label: "Organize a workshop so everyone learns together",
        weights: { humanInteraction: 4, experimentation: 1 },
      },
    ],
  },
  {
    id: 15,
    text: "When writing a research proposal, which section do you look forward to most?",
    options: [
      {
        label: "Methods — outlining the experiments you will run",
        weights: { experimentation: 4, projectTempo: 1 },
      },
      {
        label: "Analysis plan — describing how you will process and interpret data",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Introduction — framing the question and its theoretical stakes",
        weights: { theoryBuilding: 4, humanInteraction: 1 },
      },
      {
        label: "Broader impacts — explaining who benefits and how",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 16,
    text: "You notice something puzzling in everyday life — a pattern, behavior, or effect. What happens next?",
    options: [
      {
        label: "You think about how you could design a simple test to investigate it",
        weights: { experimentation: 4, theoryBuilding: 2 },
      },
      {
        label: "You wonder what data exists and whether it has been analyzed",
        weights: { dataAnalysis: 3, theoryBuilding: 2 },
      },
      {
        label: "You start building a mental model of why it might occur",
        weights: { theoryBuilding: 4, experimentation: 1 },
      },
      {
        label: "You ask people around you what they think is going on",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 17,
    text: "You are choosing between two lab cultures. What sways your decision?",
    options: [
      {
        label: "A lab where you spend most days at the bench or in the field",
        weights: { experimentation: 4, projectTempo: 1 },
      },
      {
        label: "A lab with strong computational infrastructure and data resources",
        weights: { dataAnalysis: 4, experimentation: 1 },
      },
      {
        label: "A lab known for deep, long-term inquiry into fundamental questions",
        weights: { theoryBuilding: 3, projectTempo: 2 },
      },
      {
        label: "A lab with frequent collaboration, meetings, and community engagement",
        weights: { humanInteraction: 4, projectTempo: 2 },
      },
    ],
  },
  {
    id: 18,
    text: "At the end of a research semester, what would leave you feeling most fulfilled?",
    options: [
      {
        label: "Having run experiments that produced tangible, observable results",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "Having uncovered a meaningful pattern or insight in your data",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Having developed a clearer explanation for something previously unclear",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "Having contributed to work that made a difference for others",
        weights: { humanInteraction: 4, experimentation: 1 },
      },
    ],
  },
  {
    id: 19,
    lifestyle: true,
    text: "You have three free hours. Which sounds most enjoyable?",
    options: [
      {
        label: "Running experiments or working at the bench",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "Reading papers and thinking through ideas",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "Analyzing data or exploring patterns",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Discussing ideas with others",
        weights: { humanInteraction: 4, theoryBuilding: 1 },
      },
    ],
  },
  {
    id: 20,
    lifestyle: true,
    text: "What kind of progress feels most satisfying?",
    options: [
      {
        label: "A successful experiment that worked as planned",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "A new insight that reframes how you see a problem",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "A clear pattern emerging from your data",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Helping a team solve a problem together",
        weights: { humanInteraction: 4, projectTempo: 1 },
      },
    ],
  },
  {
    id: 21,
    lifestyle: true,
    text: "Which environment sounds most exciting?",
    options: [
      {
        label: "A laboratory with equipment, samples, and active experiments",
        weights: { experimentation: 4 },
      },
      {
        label: "A quiet library or reading room with journals and notes",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "A computer workstation with datasets and analysis tools",
        weights: { dataAnalysis: 4 },
      },
      {
        label: "A research group meeting with lively discussion",
        weights: { humanInteraction: 4, projectTempo: 1 },
      },
    ],
  },
  {
    id: 22,
    lifestyle: true,
    text: "When working on a long project, what tends to keep you going?",
    options: [
      {
        label: "The next experiment and seeing tangible results",
        weights: { experimentation: 3, projectTempo: 2 },
      },
      {
        label: "Getting closer to a deeper explanation",
        weights: { theoryBuilding: 4, projectTempo: 2 },
      },
      {
        label: "Finding structure in accumulating data",
        weights: { dataAnalysis: 3, projectTempo: 2 },
      },
      {
        label: "Regular conversations with mentors and teammates",
        weights: { humanInteraction: 4, projectTempo: 1 },
      },
    ],
  },
  {
    id: 23,
    lifestyle: true,
    text: "How do you prefer to receive feedback on your work?",
    options: [
      {
        label: "By trying a revised approach and seeing what changes",
        weights: { experimentation: 3, projectTempo: 2 },
      },
      {
        label: "Through written comments on your reasoning and logic",
        weights: { theoryBuilding: 3, dataAnalysis: 2 },
      },
      {
        label: "By reviewing metrics and comparing against benchmarks",
        weights: { dataAnalysis: 4 },
      },
      {
        label: "In a conversation where you can ask questions and brainstorm",
        weights: { humanInteraction: 4 },
      },
    ],
  },
  {
    id: 24,
    lifestyle: true,
    text: "What would an ideal research afternoon look like?",
    options: [
      {
        label: "Several focused hours at the bench with quick iterations",
        weights: { experimentation: 4, projectTempo: 3 },
      },
      {
        label: "Deep reading followed by sketching connections between ideas",
        weights: { theoryBuilding: 4, projectTempo: 1 },
      },
      {
        label: "Uninterrupted time coding, plotting, and testing hypotheses in data",
        weights: { dataAnalysis: 4, projectTempo: 1 },
      },
      {
        label: "A mix of meetings, interviews, and collaborative planning",
        weights: { humanInteraction: 4, projectTempo: 2 },
      },
    ],
  },
  {
    id: 25,
    lifestyle: true,
    text: "When a project stalls, what do you tend to do first?",
    options: [
      {
        label: "Change a variable and run another trial",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "Return to first principles and rethink the approach",
        weights: { theoryBuilding: 4 },
      },
      {
        label: "Look more closely at what the existing data is telling you",
        weights: { dataAnalysis: 4, theoryBuilding: 1 },
      },
      {
        label: "Talk it through with someone who offers a fresh perspective",
        weights: { humanInteraction: 4 },
      },
    ],
  },
  {
    id: 26,
    lifestyle: true,
    text: "At the end of a productive day, what would you most likely tell a friend?",
    options: [
      {
        label: "I finally got the protocol to work",
        weights: { experimentation: 4, projectTempo: 2 },
      },
      {
        label: "I think I understand why something happens the way it does",
        weights: { theoryBuilding: 4 },
      },
      {
        label: "I found something interesting in the numbers",
        weights: { dataAnalysis: 4 },
      },
      {
        label: "We had a great discussion that moved the project forward",
        weights: { humanInteraction: 4, projectTempo: 1 },
      },
    ],
  },
];
