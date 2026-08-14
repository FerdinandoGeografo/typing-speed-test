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
    <div className="mx-auto flex min-h-screen max-w-[1880px] flex-col gap-8 px-4 pt-4 pb-8 md:gap-10 md:px-8 md:pt-8 md:pb-10 lg:gap-16 lg:px-28 lg:pb-8">
      <Header>
        <Logo />
        {bestWpm !== null && <PersonalBest wpm={bestWpm} />}
      </Header>

      <main className="flex flex-col gap-8">
        {status !== "finished" && <TestScreen />}
        {status === "finished" && <ResultScreen />}
      </main>
    </div>
  );
}
