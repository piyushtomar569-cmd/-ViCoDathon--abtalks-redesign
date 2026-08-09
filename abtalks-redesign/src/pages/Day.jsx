import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, GitBranch, CheckCircle2, Circle, Clock, ShieldCheck, Trophy, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import Confetti from "../components/Confetti";
import { dayContent } from "../data/mockData";
import { useApp } from "../context/AppContext";

const DAY_NUM = 12;

export default function Day() {
  const content = dayContent[DAY_NUM];
  const { student, completeDay, isDayCompleted } = useApp();
  const alreadyCompleted = isDayCompleted(DAY_NUM);

  const [checked, setChecked] = useState({});
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [submitted, setSubmitted] = useState(alreadyCompleted);
  const [justCompleted, setJustCompleted] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const fail = (msg) => {
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    };

    if (!githubUrl.includes("github.com")) return fail("Please paste a valid GitHub repo/commit link.");
    if (!linkedinUrl.includes("linkedin.com")) return fail("Please paste a valid LinkedIn post link.");
    if (doneCount < content.requirements.length) {
      return fail("Complete all checklist items before submitting your proof.");
    }

    setError("");
    const wasAdded = completeDay(DAY_NUM);
    setSubmitted(true);
    setJustCompleted(wasAdded);

    if (wasAdded) {
      setTimeout(() => setJustCompleted(false), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-base text-white overflow-x-hidden pb-24">
      {(submitted && justCompleted) && <Confetti />}
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-5">
        <div className="flex items-center justify-between animate-fadeUp">
          <button aria-label="Previous day" className="press w-9 h-9 rounded-full bg-surface2 flex items-center justify-center text-gray-500 transition-colors hover:text-gray-300">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center">
            <p className="text-[11px] text-gray-500">DAY {DAY_NUM} OF 60</p>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`w-6 h-1 rounded-full transition-colors duration-500 ${i < 2 ? "bg-flame-500" : "bg-surface2"}`} />
              ))}
            </div>
          </div>

          <button aria-label="Next day" className="press w-9 h-9 rounded-full bg-surface2 flex items-center justify-center text-gray-400 transition-colors hover:text-gray-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="animate-fadeUp">
          <p className="text-brand-400 text-xs font-semibold uppercase tracking-wide">{content.track}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 font-display">{content.title}</h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
            <Clock className="w-3.5 h-3.5" /> ~{content.estMinutes} min build
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed animate-fadeUp">{content.description}</p>

        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5 animate-fadeUp">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">What to build</p>
            <p className="text-[11px] text-gray-500 tabular-nums">{doneCount}/{content.requirements.length}</p>
          </div>

          <div className="h-1.5 w-full bg-surface2 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-flame-500 to-flame-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(doneCount / content.requirements.length) * 100}%` }}
            />
          </div>

          <div className="space-y-2.5">
            {content.requirements.map((r, i) => (
              <button key={i} onClick={() => toggle(i)} className="press w-full flex items-start gap-2.5 text-left group">
                {checked[i] ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-flame-500 shrink-0 mt-0.5" style={{ animation: "checkPop 0.4s cubic-bezier(.34,1.56,.64,1) both" }} />
                ) : (
                  <Circle className="w-4.5 h-4.5 text-gray-600 shrink-0 mt-0.5 transition-colors group-hover:text-gray-400" />
                )}
                <span className={`text-sm transition-all duration-300 ${checked[i] ? "text-gray-500 line-through" : "text-gray-200"}`}>{r}</span>
              </button>
            ))}
          </div>
        </div>

        {student.shields.remaining > 0 && (
          <div className="flex items-center gap-2 text-xs text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-xl px-3 py-2.5 animate-fadeUp">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Miss the midnight deadline tonight and a Streak Shield covers you automatically.
          </div>
        )}

        {submitted ? (
          <div className="bg-flame-500/10 border border-flame-500/30 rounded-2xl p-6 sm:p-8 text-center animate-popIn">
            <div
              className="w-14 h-14 rounded-full bg-flame-500 flex items-center justify-center mx-auto mb-3"
              style={{ animation: "checkPop 0.5s cubic-bezier(.34,1.56,.64,1) both, pulseRing 1.8s ease-in-out 0.5s infinite" }}
            >
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>

            <p className="font-bold text-lg font-display">Day {DAY_NUM} complete! 🔥</p>
            <p className="text-xs text-gray-400 mt-1">
              {justCompleted ? `Awesome! Your streak is now ${student.currentStreak} days.` : `Your current streak is ${student.currentStreak} days.`}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="bg-surface2 rounded-xl p-3">
                <Trophy className="w-4 h-4 text-flame-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{student.currentStreak}</p>
                <p className="text-[10px] text-gray-500">current streak</p>
              </div>
              <div className="bg-surface2 rounded-xl p-3">
                <CheckCircle2 className="w-4 h-4 text-brand-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{student.completedDays}/{student.totalDays}</p>
                <p className="text-[10px] text-gray-500">days complete</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5">
              <Link to="/dashboard" className="press inline-flex items-center justify-center gap-2 bg-surface2 border border-border px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:border-brand-500/40">
                Back to dashboard
              </Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="press inline-flex items-center justify-center gap-2 bg-flame-500 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-flame-400">
                View GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-4 sm:p-5 space-y-3 animate-fadeUp" style={shake ? { animation: "shakeX 0.45s ease" } : undefined}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">Submit your proof of work</p>
              <span className="text-[10px] uppercase tracking-wide text-gray-500">Required</span>
            </div>

            <label className="flex items-center gap-2 bg-surface2 rounded-xl px-3 border border-border transition-colors focus-within:border-flame-500">
              <GitBranch className="w-4 h-4 text-gray-500 shrink-0" />
              <input required value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="github.com/you/repo/commit/..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-600" />
            </label>

            <label className="flex items-center gap-2 bg-surface2 rounded-xl px-3 border border-border transition-colors focus-within:border-flame-500">
              <Link className="w-4 h-4 text-gray-500 shrink-0" />
              <input required value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="linkedin.com/posts/..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-600" />
            </label>

            {error && <p className="text-xs text-red-400 animate-fadeUp">{error}</p>}

            <button type="submit" className="btn-glow press w-full bg-gradient-to-r from-flame-500 to-flame-600 py-3.5 rounded-xl font-semibold transition-shadow shadow-lg shadow-flame-600/25 hover:shadow-flame-600/45">
              <span>Submit &amp; Continue Streak</span>
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
