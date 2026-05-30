"use client";

import { useState } from "react";
import type { FieldRecommendation } from "@/lib/types";
import { Card } from "./Card";

interface FieldExplorerProps {
  fields: FieldRecommendation[];
}

function FieldCard({ field }: { field: FieldRecommendation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-stone-200/80 bg-white">
      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-lg tracking-tight text-stone-900">
          {field.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {field.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">
          <span className="font-medium text-stone-800">
            You may enjoy exploring this field
          </span>
          {" — "}
          {field.appealReason}
        </p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Common Activities
            </h4>
            <ul className="mt-2 space-y-1.5">
              {field.commonActivities.map((activity) => (
                <li
                  key={activity}
                  className="text-sm leading-relaxed text-stone-600"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Typical Research Questions
            </h4>
            <ul className="mt-2 space-y-1.5">
              {field.typicalQuestions.map((question) => (
                <li
                  key={question}
                  className="text-sm leading-relaxed text-stone-600"
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-5 text-sm font-medium text-stone-700 underline-offset-2 transition-colors hover:text-stone-900 hover:underline"
        >
          {expanded ? "Hide example day" : "View example day"}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-stone-100 bg-stone-50/40 px-6 py-5 sm:px-7">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
            Example Day
          </p>
          <p className="mt-1 text-xs text-stone-500">
            An illustrative schedule—not a strict representation of every lab.
          </p>
          <ol className="mt-4 space-y-2.5">
            {field.exampleDay.map((entry) => (
              <li
                key={`${entry.time}-${entry.activity}`}
                className="flex gap-4 text-sm"
              >
                <span className="w-12 shrink-0 tabular-nums text-stone-400">
                  {entry.time}
                </span>
                <span className="text-stone-700">{entry.activity}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export function FieldExplorer({ fields }: FieldExplorerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl tracking-tight text-stone-900">
          Fields You May Enjoy Exploring
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          Based on your profile, these research fields may be worth exploring
          further. Each is a starting point for curiosity—not a recommendation
          of what you should pursue.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
}
