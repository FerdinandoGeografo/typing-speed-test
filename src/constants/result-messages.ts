import type { ResultType } from "../models/result.types";

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
