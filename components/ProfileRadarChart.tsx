"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { DimensionScores } from "@/lib/types";
import { DIMENSIONS, RADAR_LABELS } from "@/lib/types";
import { Card } from "./Card";

interface ProfileRadarChartProps {
  scores: DimensionScores;
}

export function ProfileRadarChart({ scores }: ProfileRadarChartProps) {
  const data = DIMENSIONS.map((dimension) => ({
    dimension: RADAR_LABELS[dimension],
    value: scores[dimension],
    fullMark: 100,
  }));

  return (
    <Card className="space-y-6">
      <div>
        <h2 className="font-serif text-lg tracking-tight text-stone-900">
          Research Profile
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
          A visual overview of how your responses distribute across five
          research dimensions.
        </p>
      </div>

      <div className="mx-auto w-full max-w-md">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e7e5e4" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "#78716c", fontSize: 12 }}
            />
            <Radar
              name="Profile"
              dataKey="value"
              stroke="#44403c"
              fill="#78716c"
              fillOpacity={0.2}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
