import { useMemo } from "react";

const COLORS = ["#ff6b35", "#ff9f43", "#a78bfa", "#8b5cf6", "#ffffff"];

/**
 * Fires a one-shot confetti burst covering the viewport. Mount this
 * conditionally (e.g. `{submitted && <Confetti />}`) — it un-mounts itself
 * automatically after the pieces finish falling.
 */
export default function Confetti({ count = 60 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.2 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 160,
        spin: 360 + Math.random() * 360,
        size: 6 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        round: Math.random() > 0.5,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: "-5vh",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "2px",
            animation: `confettiFall ${p.duration}s cubic-bezier(.25,.46,.45,.94) ${p.delay}s forwards`,
            "--drift": `${p.drift}px`,
            "--spin": `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
