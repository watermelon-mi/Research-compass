"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DimensionScores } from "@/lib/types";
import { calculateScores } from "@/lib/scoring";
import { QUESTIONS } from "@/lib/questions";

interface AssessmentContextValue {
  answers: Record<number, number>;
  scores: DimensionScores | null;
  setAnswer: (questionId: number, optionIndex: number) => void;
  resetAssessment: () => void;
  isComplete: boolean;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const setAnswer = useCallback((questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const resetAssessment = useCallback(() => {
    setAnswers({});
  }, []);

  const isComplete = Object.keys(answers).length === QUESTIONS.length;

  const scores = useMemo(() => {
    if (!isComplete) return null;
    return calculateScores(answers);
  }, [answers, isComplete]);

  const value = useMemo(
    () => ({
      answers,
      scores,
      setAnswer,
      resetAssessment,
      isComplete,
    }),
    [answers, scores, setAnswer, resetAssessment, isComplete],
  );

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return context;
}
