import { useEffect, useRef, useState } from "react";
import { CONFETTI_COLORS, drawConfettiRect } from "../utils/confetti";
import ReactConfetti from "react-confetti";

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 overflow-hidden"
      style={{ height: "clamp(168px, 22.64vw, 326px)" }}
    >
      {size.width > 0 && (
        <ReactConfetti
          width={size.width}
          height={size.height}
          numberOfPieces={200}
          colors={CONFETTI_COLORS}
          drawShape={drawConfettiRect}
          confettiSource={{ x: 0, y: 0, w: size.width, h: size.height }}
          gravity={0.05}
          initialVelocityY={{ min: -1.5, max: 1.5 }}
          initialVelocityX={{ min: -2, max: 2 }}
          recycle={false}
          onConfettiComplete={(confettiIstance) => {
            setIsVisible(false);
            confettiIstance?.reset();
          }}
        />
      )}
    </div>
  );
}
