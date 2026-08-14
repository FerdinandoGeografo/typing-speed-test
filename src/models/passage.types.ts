import type { Difficulty } from "./typing-test.types";

export type Passage = {
  id: string;
  text: string;
};

export type CharacterState = "pending" | "valid" | "invalid";

export type PassageData = Record<Difficulty, Passage[]>;
