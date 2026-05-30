import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { QUESTIONS } from "@/lib/questions";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20 sm:py-28">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-5">
            <h1 className="font-serif text-4xl leading-[1.15] tracking-tight text-stone-900 sm:text-[2.75rem]">
              Research Compass
            </h1>
            <p className="text-xl leading-relaxed text-stone-600">
              Discover how you think before choosing what to research.
            </p>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-stone-600">
            <p>
              Research is more than a subject. It is a way of thinking, asking
              questions, and exploring the unknown.
            </p>
            <p>
              Research Compass helps students understand their research
              preferences and evaluate compatibility with different research
              environments.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/assessment">Start Assessment</Button>
            <p className="text-sm text-stone-400">
              {QUESTIONS.length} scenarios · about 8 minutes · private, local, no account
              required
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200/80 py-8 text-center text-xs text-stone-400">
        A self-discovery tool for students exploring undergraduate research.
      </footer>
    </div>
  );
}
