import { Card } from "./Card";

interface ReflectionSummaryProps {
  paragraphs: string[];
}

export function ReflectionSummary({ paragraphs }: ReflectionSummaryProps) {
  return (
    <Card className="space-y-5 bg-stone-50/30">
      <div>
        <h2 className="font-serif text-xl tracking-tight text-stone-900">
          Reflection Summary
        </h2>
        <p className="mt-1.5 text-sm text-stone-500">
          A narrative reading of your profile—offered as encouragement for
          further self-inquiry.
        </p>
      </div>
      <div className="space-y-4">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-sm leading-[1.75] text-stone-700"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Card>
  );
}
