import { useContext } from "react";
import { TypingSpeedTestContext } from "../contexts/TypingSpeedTestContext";

export default function useTypingSpeedTest() {
  const context = useContext(TypingSpeedTestContext);
  if (context === null)
    throw new Error(
      "TypingSpeedTestContext was used outside TypingSpeedTestProvider",
    );

  return context;
}
