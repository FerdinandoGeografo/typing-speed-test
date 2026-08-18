import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import {
  type TypingAction,
  type TypingState,
} from "../models/typing-test.types";
import {
  calculateAccuracy,
  calculateCorrectChars,
  calculateElapsedMs,
  calculateWpm,
  formatTime,
  getRandomPassage,
} from "../utils/helpers";
import { TIMED_SECONDS } from "../constants/test-options";
import useLocalStorageState from "../hooks/useLocalStorage";

interface TypingSpeedTestContextValue {
  state: TypingState;
  correctChars: number;
  wpm: number;
  accuracy: number;
  time: string;
  bestWpm: number | null;
  submitBest: (wpm: number) => void;
  dispatch: React.Dispatch<TypingAction>;
}

const TypingSpeedTestContext =
  createContext<TypingSpeedTestContextValue | null>(null);

function createInitialState(): TypingState {
  return {
    status: "idle" as const,
    difficulty: "hard",
    mode: "timed",
    passage: getRandomPassage("hard"),
    input: "",
    errors: 0,
    seconds: TIMED_SECONDS,
    startedAt: null,
    finishedAt: null,
  };
}

function reducer(state: TypingState, action: TypingAction): TypingState {
  switch (action.type) {
    case "start": {
      if (state.status !== "idle") return state;
      return {
        ...state,
        status: "running" as const,
        startedAt: Date.now(),
      };
    }
    case "input": {
      if (state.status === "finished") return state;

      const { value } = action.payload;
      const { text } = state.passage;
      const previousLength = state.input.length;
      const nextLength = value.length;

      const base: TypingState =
        state.status === "idle"
          ? {
              ...state,
              status: "running" as const,
              startedAt: Date.now(),
            }
          : state;

      if (nextLength === previousLength + 1) {
        const typedChar = value[previousLength];
        const expectedChar = text[previousLength];
        const isCorrect = typedChar === expectedChar;

        const next: TypingState = {
          ...base,
          input: value,
          errors: state.errors + (isCorrect ? 0 : 1),
        };

        return value.length === text.length
          ? {
              ...next,
              status: "finished" as const,
              finishedAt: Date.now(),
            }
          : next;
      }

      if (nextLength === previousLength - 1) {
        return {
          ...base,
          input: value,
        };
      }

      return state;
    }
    case "setDifficulty": {
      if (state.status === "running") return state;
      return {
        ...state,
        difficulty: action.payload.difficulty,
        passage: getRandomPassage(action.payload.difficulty),
      };
    }
    case "setMode": {
      if (state.status === "running") return state;
      return {
        ...state,
        mode: action.payload.mode,
        seconds: action.payload.mode === "timed" ? TIMED_SECONDS : 0,
      };
    }
    case "restart": {
      return {
        ...createInitialState(),
        difficulty: state.difficulty,
        mode: state.mode,
        passage: getRandomPassage(state.difficulty),
        seconds: state.mode === "timed" ? TIMED_SECONDS : 0,
      };
    }
    case "tick": {
      if (state.status !== "running") return state;

      const isTimedUp = state.mode === "timed" && state.seconds === 0;
      return {
        ...state,
        status: isTimedUp ? "finished" : state.status,
        seconds:
          state.mode === "timed"
            ? Math.max(0, state.seconds - 1)
            : state.seconds + 1,
        finishedAt: isTimedUp ? Date.now() : state.finishedAt,
      };
    }
    default:
      throw new Error("Action type is unknown");
  }
}

function TypingSpeedTestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, createInitialState());
  const [bestWpm, setBestWpm] = useLocalStorageState<number | null>(
    "best",
    null,
  );

  const {
    status,
    input,
    passage,
    errors,
    seconds,
    mode,
    startedAt,
    finishedAt,
  } = state;

  const correctChars = calculateCorrectChars(input, passage.text);
  const elapsedMs = calculateElapsedMs(
    status,
    mode,
    seconds,
    startedAt,
    finishedAt,
  );
  const wpm = calculateWpm(correctChars, elapsedMs);
  const accuracy = calculateAccuracy(correctChars, errors);
  const time = formatTime(seconds, mode);

  const submitBest = useCallback(
    (wpm: number) => {
      setBestWpm((current) => (!current || wpm > current ? wpm : current));
    },
    [setBestWpm],
  );

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => dispatch({ type: "tick" }), 1_000);
    return () => clearInterval(id);
  }, [status]);

  return (
    <TypingSpeedTestContext.Provider
      value={{
        state,
        correctChars,
        wpm,
        bestWpm,
        accuracy,
        time,
        submitBest,
        dispatch,
      }}
    >
      {children}
    </TypingSpeedTestContext.Provider>
  );
}

export { TypingSpeedTestProvider, TypingSpeedTestContext };
