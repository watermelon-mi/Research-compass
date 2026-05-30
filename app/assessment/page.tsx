"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { useAssessment } from "@/context/AssessmentProvider";
import { QUESTIONS } from "@/lib/questions";

export default function AssessmentPage() {
  const router = useRouter();
  const { answers, setAnswer } = useAssessment();
  const [currentIndex, setCurrentIndex] = useState(0);

  const question = QUESTIONS[currentIndex];
  const selectedOption = answers[question.id];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  function handleNext() {
    if (selectedOption === undefined) return;

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      router.push("/results");
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <span className="text-sm tabular-nums text-stone-400">
          {currentIndex + 1} / {QUESTIONS.length}
        </span>
      </PageHeader>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:py-16">
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between text-xs text-stone-400">
            <span>Research Style Assessment</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-stone-700 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
            {question.lifestyle ? "Research Lifestyle" : `Scenario ${currentIndex + 1}`}
          </p>
          <h1 className="mt-4 font-serif text-2xl leading-snug tracking-tight text-stone-900 sm:text-[1.65rem]">
            {question.text}
          </h1>

          <fieldset className="mt-8 space-y-2.5">
            <legend className="sr-only">{question.text}</legend>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <label
                  key={option.label}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-lg border px-4 py-3.5 transition-all ${
                    isSelected
                      ? "border-stone-400 bg-stone-50 shadow-sm"
                      : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={isSelected}
                    onChange={() => setAnswer(question.id, index)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-stone-700"
                  />
                  <span className="text-sm leading-relaxed text-stone-700">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </fieldset>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-stone-100 pt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedOption === undefined}
            >
              {currentIndex === QUESTIONS.length - 1
                ? "View Your Profile"
                : "Continue"}
            </Button>
          </div>
        </Card>

        <p className="mt-8 text-center text-xs leading-relaxed text-stone-400">
          There are no right answers. Choose the response that feels most true
          to you—research style and lifestyle both matter.
        </p>
      </main>
    </div>
  );
}
