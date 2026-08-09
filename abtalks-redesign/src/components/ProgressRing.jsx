import { useEffect, useState } from "react";

export default function ProgressRing({ value, size = 84, label }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  // Start at 0 and animate to the real value once mounted so the ring
  // visibly draws itself in.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(value));
    return () => cancelAnimationFrame(id);
  }, [value]);

  const offset = c - (progress / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1b1b24" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>
        </defs>
      </svg>
      <p className="text-xl font-bold -mt-14 font-display tabular-nums">{progress}%</p>
      <p className="text-[11px] text-gray-500 mt-8">{label}</p>
    </div>
  );
}
