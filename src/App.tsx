import Header from "./components/Header";
import Logo from "./components/Logo";
import PersonalBest from "./components/PersonalBest";
import ResultScreen from "./components/ResultScreen";
import TestScreen from "./components/TestScreen";
import Footer from "./components/Footer";
import useTypingSpeedTest from "./hooks/useTypingSpeedTest";

export default function App() {
  const {
    state: { status },
    bestWpm,
  } = useTypingSpeedTest();

  const showFooter = false;

  return (
    <div className="flex h-dvh flex-col gap-6 md:gap-8 lg:gap-14">
      <Header>
        <Logo />
        {bestWpm !== null && <PersonalBest wpm={bestWpm} />}
      </Header>

      <main className="flex-1 overflow-y-auto">
        {status !== "finished" && <TestScreen />}
        {status === "finished" && <ResultScreen />}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
