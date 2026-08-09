import { Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ThemeToggle({ showLabel = false }) {
  const { theme, toggleTheme } = useApp();
  const light = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${light ? "dark" : "light"} mode`}
      title={`Switch to ${light ? "dark" : "light"} mode`}
      className="theme-toggle press flex items-center gap-2 rounded-full border border-border bg-surface2 px-2.5 py-2 text-xs font-semibold transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
    >
      <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${light ? "bg-amber-100 text-amber-600" : "bg-brand-500/15 text-brand-400"}`}>
        {light ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </span>
      {showLabel && <span>{light ? "Light" : "Dark"}</span>}
    </button>
  );
}
