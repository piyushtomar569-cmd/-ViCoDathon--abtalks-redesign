import { ShieldCheck } from "lucide-react";

export default function StreakShieldBanner({ shields }) {
  return (
    <div className="shimmer-sweep hover-lift bg-surface2 border border-brand-500/30 rounded-2xl p-4 flex items-center gap-3 animate-fadeUp">
      <div
        className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0"
        style={{ animation: "ringPulse 2.4s ease-in-out infinite" }}
      >
        <ShieldCheck className="w-5 h-5 text-brand-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">
          {shields.remaining} Streak Shield{shields.remaining !== 1 ? "s" : ""} active
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Miss a day and a shield auto-protects your streak. Earn 1 every 15 days.
        </p>
      </div>
    </div>
  );
}
