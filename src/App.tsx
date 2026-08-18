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
    <div className="flex h-full min-h-dvh flex-col gap-8 px-4 pt-4 pb-8 md:gap-10 md:px-8 md:pt-8 md:pb-10 lg:gap-16 lg:px-28 lg:pb-8">
      <Header>
        <Logo />
        {bestWpm !== null && <PersonalBest wpm={bestWpm} />}
      </Header>

      <main className="flex flex-col gap-8">
        {status !== "finished" && <TestScreen />}
        {status === "finished" && <ResultScreen />}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
