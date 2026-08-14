import { DIFFICULTY_OPTIONS, MODE_OPTIONS } from "../constants/test-options";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import { type Difficulty, type Mode } from "../models/typing-test.types";
import ButtonGroup from "./ButtonGroup";
import Divider from "./Divider";

export default function TestSettings() {
  const {
    state: { status, difficulty, mode },
    dispatch,
  } = useTypingSpeedTest();
  const disabled = status === "running";

  return (
    <div className="flex items-center gap-2.5 sm:gap-4">
      <ButtonGroup
        label="difficulty"
        options={DIFFICULTY_OPTIONS}
        selected={difficulty}
        disabled={disabled}
        onSelect={(value) =>
          dispatch({
            type: "setDifficulty",
            payload: { difficulty: value as Difficulty },
          })
        }
      />
      <Divider className="hidden sm:block" />
      <ButtonGroup
        label="mode"
        options={MODE_OPTIONS}
        selected={mode}
        disabled={disabled}
        onSelect={(value) =>
          dispatch({ type: "setMode", payload: { mode: value as Mode } })
        }
      />
    </div>
  );
}
