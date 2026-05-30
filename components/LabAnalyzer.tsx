"use client";

import { useState } from "react";
import type { DimensionScores } from "@/lib/types";
import {
  analyzeLabDescription,
  compareProfiles,
} from "@/lib/lab-analyzer";
import { generateEnvironmentReflection } from "@/lib/environment-reflection";
import type { EnvironmentReflectionResult } from "@/lib/environment-reflection-types";
import { EnvironmentReflection } from "./EnvironmentReflection";
import { Button } from "./Button";
import { Card } from "./Card";

interface LabAnalyzerProps {
  userScores: DimensionScores;
}

function ResultCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="space-y-4">
      <h3 className="font-serif text-base tracking-tight text-stone-900">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-stone-600">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function LabAnalyzer({ userScores }: LabAnalyzerProps) {
  const [labText, setLabText] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof compareProfiles
  > | null>(null);
  const [labProfile, setLabProfile] = useState<ReturnType<
    typeof analyzeLabDescription
  > | null>(null);
  const [reflection, setReflection] =
    useState<EnvironmentReflectionResult | null>(null);

  function handleAnalyze() {
    if (!labText.trim()) return;
    const profile = analyzeLabDescription(labText);
    setLabProfile(profile);
    setResult(compareProfiles(userScores, profile));
    setReflection(generateEnvironmentReflection(labText, profile));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl tracking-tight text-stone-900">
          Compare With A Lab
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          Paste a professor profile, lab description, or research statement.
          The analysis runs locally and is meant to prompt reflection—not to
          tell you whether you should join.
        </p>
      </div>

      <Card className="space-y-5">
        <textarea
          value={labText}
          onChange={(e) => setLabText(e.target.value)}
          placeholder="Paste a lab description here. Example: Our group uses genetics and RNA sequencing to study neural mechanisms. We combine wet-lab experiments with machine learning for imaging analysis, and collaborate with clinical partners on long-term patient studies..."
          rows={8}
          className="w-full resize-y rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-3.5 text-sm leading-relaxed text-stone-800 placeholder:text-stone-400 focus:border-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
        />

        <Button onClick={handleAnalyze} disabled={!labText.trim()}>
          Analyze Compatibility
        </Button>
      </Card>

      {result && labProfile && (
        <div className="space-y-4">
          <ResultCard title="Why This Might Be A Good Fit" items={result.whyGoodFit} />
          <ResultCard title="Potential Challenges" items={result.potentialChallenges} />
          <ResultCard title="Questions To Consider" items={result.questionsToConsider} />

          <div className="flex items-center gap-3 rounded-lg border border-stone-100 bg-stone-50/50 px-4 py-3">
            <span className="font-serif text-lg tabular-nums text-stone-500">
              {result.overallMatch}%
            </span>
            <p className="text-xs leading-relaxed text-stone-500">
              Approximate alignment score—treat as a secondary signal. Meaningful
              fit depends on conversations, visits, and lived experience.
            </p>
          </div>

          {labProfile.matchedKeywords.length > 0 && (
            <div className="px-1">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Signals detected in text
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {labProfile.matchedKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-600"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {reflection && <EnvironmentReflection reflection={reflection} />}
        </div>
      )}
    </div>
  );
}
