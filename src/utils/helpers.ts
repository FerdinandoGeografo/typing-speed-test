import { passages } from "../constants/passages";
import { TIMED_SECONDS } from "../constants/test-options";
import type { CharacterState } from "../models/passage.types";
import type { ResultType } from "../models/result.types";
import {
  type Difficulty,
  type Mode,
  type TestStatus,
} from "../models/typing-test.types";

export function getRandomPassage(difficulty: Difficulty) {
  const candidates = passages[difficulty];

  if (candidates.length === 0)
    throw new Error(`No passages available for difficulty: ${difficulty}`);

  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function calculateCorrectChars(
  input: string,
  passageText: string,
): number {
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === passageText[i]) correct++;
  }
  return correct;
}

export function calculateElapsedMs(
  status: TestStatus,
  mode: Mode,
  seconds: number,
  startedAt: number | null,
  finishedAt: number | null,
) {
  if (status === "finished") {
    return startedAt !== null && finishedAt !== null
      ? finishedAt - startedAt
      : 0;
  }

  if (status === "running") {
    const elapsedSeconds = mode === "timed" ? TIMED_SECONDS - seconds : seconds;
    return elapsedSeconds * 1_000;
  }

  return 0;
}

export function calculateAccuracy(correctChars: number, errors: number) {
  const attempts = correctChars + errors;
  if (attempts === 0) return 100;
  return Math.round((correctChars / attempts) * 100);
}

export function calculateWpm(correctChars: number, elapsedMs: number) {
  if (correctChars === 0 || elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60_000;
  return Math.round(correctChars / 5 / minutes);
}

export function formatTime(seconds: number, mode: Mode) {
  if (mode === "timed") return `0:${seconds.toString().padStart(2, "0")}`;
  const minutes = Math.floor(seconds / 60);
  const totalSeconds = seconds % 60;
  return `${minutes}:${totalSeconds.toString().padStart(2, "0")}`;
}

export function calculateResultType(
  wpm: number,
  previousBest: number | null,
): ResultType {
  if (previousBest === null) return "baseline";
  if (wpm > previousBest) return "record";
  return "normal";
}

export function getCharState(
  expected: string,
  input: string,
  index: number,
): CharacterState {
  const typed = input.at(index);
  if (typed === undefined) return "pending";
  return typed === expected ? "valid" : "invalid";
}
