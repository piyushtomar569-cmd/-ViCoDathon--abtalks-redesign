import { Link } from "react-router-dom";
import {
  Flame,
  GitBranch,
  Link as LinkIcon,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { stats, liveFeed } from "../data/mockData";
import CountUp from "../components/CountUp";
import useReveal from "../hooks/useReveal";
import ThemeToggle from "../components/ThemeToggle";

export default function Landing() {
  const hour = new Date().getHours();
  const isLateNight = hour >= 22 || hour < 5;

  return (
    <div className="min-h-screen bg-base text-white overflow-x-hidden">
      {/* Glow Backdrop — layered floating blobs for ambient motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-flame-500/20" />
        <div
          className="blob top-72 -left-16 w-56 h-56 bg-brand-500/15"
          style={{ animationDelay: "-3s", animationDuration: "11s" }}
        />
        <div
          className="blob top-[520px] -right-10 w-64 h-64 bg-flame-400/10"
          style={{ animationDelay: "-6s", animationDuration: "13s" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-16">
        {/* Logo + theme */}
        <div className="flex items-center justify-between gap-4 animate-fadeUp">
          <div className="flex items-center gap-2">
          <Flame
            className="w-7 h-7 text-flame-500 animate-float"
            fill="currentColor"
          />
            <span className="font-bold text-lg font-display">ABTalks</span>
          </div>
          <ThemeToggle showLabel />
        </div>

        {/* Hero */}
        <h1
          className="max-w-3xl text-[2.4rem] leading-[1.1] font-extrabold mt-8 animate-fadeUp font-display"
          style={{ animationDelay: ".1s" }}
        >
          Build every day.
          <br />
          <span className="gradient-text">
            Get noticed by recruiters.
          </span>
        </h1>

        <p
          className="mt-4 text-gray-400 text-[15px] leading-relaxed animate-fadeUp"
          style={{ animationDelay: ".2s" }}
        >
          A 60-day coding challenge for Indian college students. Pick a track,
          ship something daily, and build a public proof-of-work streak
          recruiters can actually see.
        </p>

        {isLateNight && (
          <div
            className="mt-4 text-xs text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-lg px-3 py-2 inline-block animate-fadeUp"
            style={{ animationDelay: ".25s" }}
          >
            🌙 Coding this late? You're exactly who this was built for.
          </div>
        )}

        {/* CTA */}
        <div
          className="flex gap-3 mt-7 animate-fadeUp"
          style={{ animationDelay: ".3s" }}
        >
          <Link
            to="/dashboard"
            className="btn-glow press group flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-flame-500 to-flame-600 py-3.5 rounded-2xl font-semibold shadow-lg shadow-flame-600/30 transition-shadow hover:shadow-flame-600/50"
          >
            <span className="flex items-center gap-2">
              Start Challenge
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <p
          className="text-[11px] text-gray-500 mt-2 animate-fadeUp"
          style={{ animationDelay: ".35s" }}
        >
          Free forever. Takes 2 minutes to set up.
        </p>

        {/* Live proof-of-work ticker */}
        <div
          className="mt-8 -mx-5 animate-fadeUp"
          style={{ animationDelay: ".4s" }}
        >
          <div className="relative overflow-hidden py-1 border-y border-border/70">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" />
            <div
              className="flex gap-6 w-max"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {[...liveFeed, ...liveFeed].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-400 shrink-0 px-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulseRing shrink-0" />
                  <span className="font-semibold text-gray-200">{item.name}</span>
                  <span>{item.action}</span>
                  <span className="text-gray-600">· {item.track}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-9 max-w-4xl">
          <StatCard
            icon={Users}
            value={stats.activeStudents}
            label="Active Students"
            delay={0}
          />

          <StatCard
            icon={TrendingUp}
            value={stats.colleges}
            label="Colleges"
            delay={0.08}
          />

          <StatCard
            icon={Flame}
            value={stats.avgStreak}
            label="Avg. Streak"
            delay={0.16}
          />

          <StatCard
            icon={ShieldCheck}
            value={stats.commitsShipped}
            label="Commits"
            delay={0.24}
          />
        </div>

        {/* How it works */}
        <h2 className="text-lg font-bold mt-12 font-display">
          How it works
        </h2>

        <div className="mt-4 space-y-3 max-w-3xl">
          <Step
            n="1"
            title="Pick your track"
            desc="Web Dev, DSA, ML or App Development."
            delay={0}
          />

          <Step
            n="2"
            title="Ship daily proof"
            desc="One GitHub commit and one LinkedIn post every day."
            delay={0.1}
          />

          <Step
            n="3"
            title="Keep your streak alive"
            desc="Miss a day? Streak Shields protect you."
            delay={0.2}
          />
        </div>

        {/* Proof */}
        <ProofCard />

        <Link
          to="/dashboard"
          className="cta-secondary-hover press block text-center mt-10 bg-surface2 border border-border py-3.5 rounded-2xl font-semibold transition-colors hover:border-brand-500/40"
        >
          I already have an account →
        </Link>

        <p className="text-center text-[11px] text-gray-600 mt-8">
          Built for students, by students. © 2026 ABTalks.
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal hover-lift bg-surface border border-border rounded-2xl p-4"
      style={{ transitionDelay: `${delay}s` }}
    >
      <Icon className="w-6 h-6 text-flame-500 mb-3" />

      <h3 className="text-xl font-bold font-display">
        <CountUp value={value} />
      </h3>

      <p className="text-xs text-gray-400 mt-1">
        {label}
      </p>
    </div>
  );
}

function Step({ n, title, desc, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal hover-lift flex items-start gap-4 bg-surface border border-border rounded-2xl p-4"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 flex items-center justify-center font-bold shrink-0 shadow-md shadow-flame-600/30">
        {n}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}

function ProofCard() {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal mt-10 bg-surface rounded-2xl p-5 border border-border"
    >
      <p className="text-sm font-semibold mb-3">
        Daily proof of work
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="hover-lift flex-1 flex items-center gap-2 bg-surface2 rounded-xl px-3 py-2.5 text-xs">
          <GitBranch className="w-4 h-4 text-gray-400" />
          GitHub Commit
        </div>

        <div className="hover-lift flex-1 flex items-center gap-2 bg-surface2 rounded-xl px-3 py-2.5 text-xs">
          <LinkIcon className="w-4 h-4 text-gray-400" />
          LinkedIn Post
        </div>
      </div>
    </div>
  );
}
