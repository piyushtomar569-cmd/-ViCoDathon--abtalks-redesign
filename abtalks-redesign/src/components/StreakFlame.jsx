import { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";

const EMBERS = [
  { left: "30%", delay: "0s", drift: "-8px" },
  { left: "50%", delay: "0.5s", drift: "6px" },
  { left: "65%", delay: "1s", drift: "12px" },
  { left: "42%", delay: "1.4s", drift: "-4px" },
];

export default function StreakFlame({ streak }) {
  const isZero = streak === 0;

  // Count the streak number up on mount instead of just snapping to it.
  const [display, setDisplay] = useState(isZero ? 0 : Math.max(streak - 6, 0));
  useEffect(() => {
    if (isZero) {
      setDisplay(0);
      return;
    }
    let raf;
    const start = performance.now();
    const from = Math.max(streak - 6, 0);
    const duration = 700;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(from + t * (streak - from)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [streak, isZero]);

  const embers = useMemo(() => EMBERS, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      <div
        className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
          isZero ? "bg-surface2" : "bg-gradient-to-br from-flame-400 to-flame-600 animate-pulseRing"
        }`}
      >
        {!isZero &&
          embers.map((e, i) => (
            <span
              key={i}
              className="absolute bottom-3 w-1.5 h-1.5 rounded-full bg-flame-300/80"
              style={{
                left: e.left,
                animation: `emberRise 2.2s ease-in ${e.delay} infinite`,
                "--drift": e.drift,
              }}
            />
          ))}
        <Flame
          className={`w-11 h-11 relative ${isZero ? "text-gray-600" : "text-white animate-flicker"}`}
          fill="currentColor"
        />
      </div>
      <p className="mt-3 text-4xl font-extrabold tabular-nums font-display">
        {display}
        <span className="text-base font-medium text-gray-400 ml-1">
          {streak === 1 ? "day" : "days"}
        </span>
      </p>
      <p className="text-xs text-gray-500 mt-0.5">
        {isZero ? "Start your streak today" : "current streak"}
      </p>
    </div>
  );
}
