"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ArchetypeProfile } from "@/components/ArchetypeProfile";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FieldExplorer } from "@/components/FieldExplorer";
import { LabAnalyzer } from "@/components/LabAnalyzer";
import { PageHeader } from "@/components/PageHeader";
import { ProfileRadarChart } from "@/components/ProfileRadarChart";
import { ProgressBar } from "@/components/ProgressBar";
import { ReflectionSummary } from "@/components/ReflectionSummary";
import { useAssessment } from "@/context/AssessmentProvider";
import { recommendFields } from "@/lib/fields";
import { generateReflectionSummary } from "@/lib/reflection-summary";
import { determineArchetype, getNormalizedScores } from "@/lib/scoring";
import { DIMENSION_DESCRIPTIONS, DIMENSION_LABELS } from "@/lib/types";
import type { Dimension } from "@/lib/types";

export default function ResultsPage() {
  const router = useRouter();
  const { scores, isComplete, resetAssessment } = useAssessment();

  useEffect(() => {
    if (!isComplete || !scores) {
      router.replace("/assessment");
    }
  }, [isComplete, scores, router]);

  const normalizedScores = useMemo(
    () => (scores ? getNormalizedScores(scores) : null),
    [scores],
  );

  const archetype = useMemo(
    () => (scores ? determineArchetype(scores) : null),
    [scores],
  );

  const fields = useMemo(
    () => (scores ? recommendFields(scores) : []),
    [scores],
  );

  const summary = useMemo(
    () =>
      scores && archetype
        ? generateReflectionSummary(scores, archetype)
        : [],
    [scores, archetype],
  );

  if (!scores || !normalizedScores || !archetype) {
    return null;
  }

  function handleRetake() {
    resetAssessment();
    router.push("/assessment");
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <Button variant="ghost" onClick={handleRetake}>
          Retake
        </Button>
      </PageHeader>

      <main className="mx-auto w-full max-w-3xl space-y-12 px-6 py-12 sm:space-y-14 sm:py-16">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
            Your Research Profile
          </p>
          <p className="text-base leading-relaxed text-stone-600">
            Based on your responses, here is a reading of how you tend to
            approach research. Treat this as a starting point for reflection—not
            a fixed identity.
          </p>
        </div>

        <ProfileRadarChart scores={normalizedScores} />

        <Card className="space-y-7">
          <div>
            <h2 className="font-serif text-lg tracking-tight text-stone-900">
              Dimension Details
            </h2>
            <p className="mt-1.5 text-sm text-stone-500">
              How strongly each orientation appeared across your responses.
            </p>
          </div>
          <div className="space-y-6">
            {(Object.keys(DIMENSION_LABELS) as Dimension[]).map((dimension) => (
              <ProgressBar
                key={dimension}
                label={DIMENSION_LABELS[dimension]}
                description={DIMENSION_DESCRIPTIONS[dimension]}
                value={normalizedScores[dimension]}
              />
            ))}
          </div>
        </Card>

        <ArchetypeProfile archetype={archetype} />

        <FieldExplorer fields={fields} />

        <LabAnalyzer userScores={scores} />

        <ReflectionSummary paragraphs={summary} />

        <p className="pb-4 text-center text-xs leading-relaxed text-stone-400">
          This profile is a mirror, not a map. Use it to ask better questions
          about yourself and the environments you explore.
        </p>
      </main>
    </div>
  );
}
