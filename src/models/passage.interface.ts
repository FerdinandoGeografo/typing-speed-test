import type { Difficulty } from "./typing-state.interface";

export interface Passage {
  id: string;
  text: string;
}

export type CharacterState = "pending" | "valid" | "invalid";

export type PassageData = Record<Difficulty, Passage[]>;
