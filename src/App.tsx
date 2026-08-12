import Header from "./components/Header";
import Logo from "./components/Logo";
import PersonalBest from "./components/PersonalBest";
import ResultScreen from "./components/ResultScreen";
import TestScreen from "./components/TestScreen";
import useTypingSpeedTest from "./hooks/useTypingSpeedTest";

export default function App() {
  const {
    state: { status },
    bestWpm,
  } = useTypingSpeedTest();

  return (
    <div className="flex min-h-screen flex-col gap-8 bg-neutral-900 p-4 sm:gap-10 sm:p-8 md:gap-16 md:px-28">
      <Header>
        <Logo />
        {bestWpm && <PersonalBest wpm={bestWpm} />}
      </Header>

      <main className="flex flex-col gap-8">
        {status !== "finished" && <TestScreen />}
        {status === "finished" && <ResultScreen />}
      </main>
    </div>
  );
}
