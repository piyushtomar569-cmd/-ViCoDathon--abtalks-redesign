# ABTalks — Redesign

A mobile-first redesign of ABTalks, a 60-day coding challenge platform for
Indian college students. Students pick a track, ship something daily, and
keep a public streak alive by submitting a GitHub commit + a LinkedIn post.

Built with React 19 + Vite + Tailwind CSS v4 + react-router-dom + lucide-react.
No backend — all data is mocked in `src/data/mockData.js`.

## Route map

```
/
/dashboard
/day/12
```

## Run locally

```bash
npm install
npm run dev
```

## What's on each screen

**`/` — Landing page**
First touchpoint for someone who has never heard of ABTalks. Leads with the
outcome ("get noticed by recruiters"), shows social proof (active students,
colleges, avg. streak, commits shipped — with a live scrolling feed of real
proof-of-work-style activity), and a 3-step "how it works" so the commitment
is legible before someone taps "Start Challenge." A late-night message
appears automatically between 10pm–5am, since the brief notes most usage
happens on phones late at night after college.

**`/dashboard` — Student dashboard**
- Current streak (animated flame, counts up)
- Today's task card, linking straight into `/day/12`
- Progress through the challenge (animated ring, %)
- Overall completion (days done / 60)
- Student standing via unlockable achievement badges
- A 60-day calendar heatmap so a student can see their whole run at a glance

**`/day/12` — Challenge day**
- The day's task, track, and estimated build time
- A tappable requirements checklist with live progress
- A submission form for the GitHub link + LinkedIn post link, with
  validation and a confetti-and-streak-update success state

## Edge cases

All three are implemented in logic, not just visual mockups:

- **First day, no streak** — toggle `NEW_USER_MODE` to `true` in
  `src/data/mockData.js`. The dashboard swaps the streak card for a
  "you haven't submitted Day 1 yet" state with a direct CTA, and the
  calendar heatmap resets to all-upcoming.
- **A missed day** — on by default (`student.lastActivityMissed`). The
  dashboard shows a banner explaining Day 8 was missed and the streak
  reset once, and the calendar heatmap marks day 8 as missed and day 3 as
  protected by a Streak Shield, so the difference between "missed" and
  "shielded" is visible.
- **Empty profile** — set `student.githubConnected` to `false` in
  `src/data/mockData.js`. The achievements panel replaces the badge list
  with a "Connect GitHub to unlock badges & recruiter visibility" prompt
  instead of showing empty/broken badge states.

## The thoughtful addition: Streak Shields

Missing one day of a 60-day challenge shouldn't erase weeks of consistency —
that's how most streak products lose people right when life gets busy.
Streak Shields are earned automatically (1 every 15 days) and silently
protect a missed day so the public streak survives a bad night. The
dashboard and the day page both surface shield status, so a student always
knows exactly how much slack they have before a missed day actually costs
them their streak.

## Deploying

This repo has no backend dependencies, so any static host works — e.g.
`vercel deploy` or dragging the `npm run build` output into Netlify — to get
the live URL for submission alongside this route map.


## ✨ Enhanced demo features

- **Live streak persistence:** submitting a completed day now increases the current streak, completed-day count and longest streak.
- **No double-counting:** refreshing the page or opening the completed day again does not increase the streak twice.
- **Light / dark mode:** use the sun/moon toggle. Your choice is saved in localStorage.
- **Responsive UI:** wider layouts on tablets/desktops, compact mobile controls, responsive cards and forms.
- **Progress feedback:** the day checklist must be complete before submission, with animated progress and completion stats.
- **Local persistence:** demo progress survives browser refreshes.
