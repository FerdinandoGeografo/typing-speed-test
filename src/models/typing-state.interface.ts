import type { Passage } from "./passage.interface";

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "timed" | "passage";
export type TestStatus = "idle" | "running" | "finished";

export interface TypingState {
  status: TestStatus;
  difficulty: Difficulty;
  mode: Mode;
  passage: Passage;
  input: string;
  errors: number;
  seconds: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export type TypingAction =
  | { type: "start" }
  | { type: "input"; payload: { value: string } }
  | { type: "tick" }
  | {
      type: "setDifficulty";
      payload: { difficulty: Difficulty };
    }
  | { type: "setMode"; payload: { mode: Mode } }
  | { type: "restart" };

export const DIFFICULTY_OPTIONS = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];

export const MODE_OPTIONS = [
  {
    label: "Timed (60s)",
    value: "timed",
  },
  {
    label: "Passage",
    value: "passage",
  },
];

export const TIMED_SECONDS = 60;

export type ResultType = "baseline" | "record" | "normal";

export const RESULT_MESSAGES: Record<
  ResultType,
  { title: string; message: string }
> = {
  baseline: {
    title: "Baseline established!",
    message:
      "You’ve set the bar. Now the real challenge begins—time to beat it.",
  },
  normal: {
    title: "Test complete!",
    message: "Solid run. Keep pushing to beat your high score.",
  },
  record: {
    title: "High score smashed!",
    message: "You’re getting faster. That was incredible typing.",
  },
};
