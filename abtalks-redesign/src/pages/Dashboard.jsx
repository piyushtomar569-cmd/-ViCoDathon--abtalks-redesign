import { Link } from "react-router-dom";
import { ChevronRight, GitBranch, Sparkles, Target, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import StreakFlame from "../components/StreakFlame";
import ProgressRing from "../components/ProgressRing";
import CalendarHeatmap from "../components/CalendarHeatmap";
import StreakShieldBanner from "../components/StreakShieldBanner";
import { badges, dayContent } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { student, history } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Still up? Respect. 🌙" : hour < 12 ? "Good morning ☀️" : hour < 18 ? "Good afternoon" : "Good evening 🔥";
  const progressPct = Math.round((student.completedDays / student.totalDays) * 100);
  const isNew = student.currentStreak === 0 && student.completedDays === 0;
  const today = dayContent[12];

  return (
    <div className="min-h-screen bg-base text-white overflow-x-hidden pb-24">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-5">
        <div className="animate-fadeUp">
          <p className="text-gray-400 text-sm">{greeting}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5 font-display">{student.name.split(" ")[0]}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{student.track} · {student.college}</p>
        </div>

        {student.lastActivityMissed && (
          <div className="bg-red-500/10 border border-red-500/25 rounded-2xl px-4 py-3 text-sm animate-fadeUp">
            <p className="font-semibold text-red-400">Day 8 was missed</p>
            <p className="text-xs text-gray-400 mt-0.5">
              A Streak Shield wasn't available that day, so your streak reset once — but you've since rebuilt {student.currentStreak} days. Keep going.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-5">
          <section className="bg-surface rounded-3xl border border-border p-5 animate-fadeUp">
            {isNew ? (
              <div className="text-center py-4">
                <StreakFlame streak={0} />
                <p className="text-sm text-gray-400 mt-3">You haven't submitted Day 1 yet — every long streak starts with one commit.</p>
                <Link to="/day/12" className="press inline-block mt-4 bg-flame-500 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-flame-400">Do Day 1 now</Link>
              </div>
            ) : (
              <>
                <StreakFlame streak={student.currentStreak} />
                <div className="flex justify-around mt-4 pt-4 border-t border-border text-center">
                  <Stat value={student.longestStreak} label="longest streak" />
                  <Stat value={`${student.completedDays}/${student.totalDays}`} label="days done" />
                  <Stat value={student.shields.remaining} label="shields left" />
                </div>
              </>
            )}
          </section>

          <div className="grid grid-cols-2 gap-3">
            <div className="hover-lift bg-surface rounded-2xl border border-border p-4 flex flex-col items-center justify-center animate-fadeUp">
              <ProgressRing value={progressPct} label="challenge progress" />
            </div>
            <div className="hover-lift bg-surface rounded-2xl border border-border p-4 flex flex-col justify-center gap-3 animate-fadeUp">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <p className="text-2xl font-bold font-display">{student.completedDays}<span className="text-gray-500 text-sm">/{student.totalDays}</span></p>
              <p className="text-[11px] text-gray-500">days completed overall</p>
            </div>
          </div>
        </div>

        {!isNew && <StreakShieldBanner shields={student.shields} />}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/day/12" className="group shimmer-sweep press block bg-gradient-to-br from-brand-600/20 to-flame-600/20 border border-brand-500/30 rounded-2xl p-5 animate-fadeUp transition-colors hover:border-brand-500/50">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-brand-400 font-semibold">Today · Day 12</p>
                <p className="font-bold mt-1">{today.title}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="flex items-center gap-1 bg-surface2 text-[11px] px-2 py-1 rounded-md"><GitBranch className="w-3 h-3" /> commit</span>
                  <span className="flex items-center gap-1 bg-surface2 text-[11px] px-2 py-1 rounded-md"><Link className="w-3 h-3" /> post</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <div className="bg-surface border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-flame-500" />
              <p className="text-sm font-semibold">Streak goal</p>
            </div>
            <p className="text-sm text-gray-400 mt-2">You're building proof of work one day at a time.</p>
            <div className="mt-4 h-2 bg-surface2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-flame-500 rounded-full transition-all duration-700" style={{ width: `${Math.min((student.currentStreak / 30) * 100, 100)}%` }} />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">{student.currentStreak}/30 days toward the 30-day milestone</p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_.6fr] gap-5">
          <div className="bg-surface rounded-2xl border border-border p-4 animate-fadeUp">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-sm font-semibold">Your 60-day map</p>
              <span className="text-[10px] text-gray-500">{student.completedDays} completed</span>
            </div>
            <CalendarHeatmap days={history} />
          </div>

          <div className="bg-surface rounded-2xl border border-border p-4 animate-fadeUp">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-flame-500" />
              <p className="text-sm font-semibold">Quick stats</p>
            </div>
            <div className="space-y-3">
              <QuickStat label="Current streak" value={`${student.currentStreak} days`} />
              <QuickStat label="Best streak" value={`${student.longestStreak} days`} />
              <QuickStat label="Completion" value={`${progressPct}%`} />
            </div>
          </div>
        </section>

        <div className="bg-surface rounded-2xl border border-border p-4 animate-fadeUp">
          <p className="text-sm font-semibold mb-3">Achievements</p>
          <div className="flex gap-2 flex-wrap">
            {badges.map((b, i) => (
              <div key={b.id} className={`animate-popIn flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border transition-transform hover:scale-105 ${b.unlocked ? "shimmer-sweep bg-flame-500/10 border-flame-500/30" : "bg-surface2 border-border text-gray-600"}`} style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
                <span className={b.unlocked ? "" : "grayscale opacity-40"}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-lg font-bold font-display">{value}</p>
      <p className="text-[11px] text-gray-500">{label}</p>
    </div>
  );
}

function QuickStat({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-surface2 rounded-xl px-3 py-2.5">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}
