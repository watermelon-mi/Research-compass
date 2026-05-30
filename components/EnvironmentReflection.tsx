import type { EnvironmentReflectionResult, GroupedReflectionItems } from "@/lib/environment-reflection-types";
import { Card } from "./Card";

interface EnvironmentReflectionProps {
  reflection: EnvironmentReflectionResult;
}

function ReflectionCard({
  title,
  description,
  groups,
}: {
  title: string;
  description: string;
  groups: GroupedReflectionItems[];
}) {
  return (
    <Card className="space-y-6">
      <div>
        <h3 className="font-serif text-base tracking-tight text-stone-900">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
          {description}
        </p>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs font-medium uppercase tracking-wider text-stone-400">
              {group.category}
            </h4>
            <ul className="mt-3 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-stone-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EnvironmentReflection({
  reflection,
}: EnvironmentReflectionProps) {
  return (
    <div className="space-y-6 border-t border-stone-200/80 pt-10">
      <div>
        <h2 className="font-serif text-xl tracking-tight text-stone-900">
          Research Environment Reflection
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          Use these prompts to think critically about research environments
          and mentorship styles. This is not a judgment of any lab—it is a
          guide to the questions worth asking.
        </p>
      </div>

      <ReflectionCard
        title="Green Flags To Look For"
        description="Considerations that may be worth confirming—not claims about what this lab definitely offers."
        groups={reflection.greenFlags}
      />

      <ReflectionCard
        title="Potential Challenges To Consider"
        description="Tradeoffs and tensions to reflect on. These are not warnings—they are prompts for honest self-inquiry."
        groups={reflection.challenges}
      />

      <ReflectionCard
        title="Questions You Might Ask"
        description="Practical questions for a PI, graduate student, or current undergraduate in the group."
        groups={reflection.questionsToAsk}
      />

      <Card className="space-y-4 bg-stone-50/30">
        <h3 className="font-serif text-base tracking-tight text-stone-900">
          Reflection Summary
        </h3>
        <div className="space-y-4">
          {reflection.summary.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-[1.75] text-stone-700"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
}
