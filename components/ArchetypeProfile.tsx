import type { Archetype } from "@/lib/types";
import { Card } from "./Card";

interface ArchetypeProfileProps {
  archetype: Archetype;
}

function ListSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-stone-800">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-stone-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArchetypeProfile({ archetype }: ArchetypeProfileProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
          Research Archetype
        </p>
        <h2 className="font-serif text-2xl tracking-tight text-stone-900 sm:text-3xl">
          {archetype.name}
        </h2>
        <p className="text-base leading-relaxed text-stone-600">
          {archetype.tagline}
        </p>
        <p className="text-sm leading-relaxed text-stone-600">
          {archetype.description}
        </p>
      </div>

      <Card className="space-y-6">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-stone-400">
            Core Motivation
          </h3>
          <p className="mt-2 text-base text-stone-800">
            {archetype.coreMotivation}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <ListSection title="Strengths" items={archetype.strengths} />
          <ListSection
            title="Potential Challenges"
            items={archetype.challenges}
          />
        </div>
      </Card>

      <Card>
        <ListSection
          title="Preferred Research Environments"
          items={archetype.environments}
        />
      </Card>

      <Card>
        <h3 className="text-sm font-medium text-stone-800">
          Reflection Questions
        </h3>
        <p className="mt-1.5 text-sm text-stone-500">
          Sit with these—not to confirm the result, but to notice what resonates.
        </p>
        <ul className="mt-4 space-y-3">
          {archetype.reflectionQuestions.map((question) => (
            <li
              key={question}
              className="rounded-lg border border-stone-100 bg-stone-50/50 px-4 py-3 text-sm leading-relaxed text-stone-700"
            >
              {question}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
