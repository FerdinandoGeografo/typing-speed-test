import type { Passage } from "./passage.types";

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "timed" | "passage";
export type TestStatus = "idle" | "running" | "finished";

export type TypingState = {
  status: TestStatus;
  difficulty: Difficulty;
  mode: Mode;
  passage: Passage;
  input: string;
  errors: number;
  seconds: number;
  startedAt: number | null;
  finishedAt: number | null;
};

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
