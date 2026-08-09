// Toggle this to demo the "brand new student" empty-state
export const NEW_USER_MODE = false;

export const student = {
  name: "Priya Sharma",
  college: "MNIT Jaipur",
  track: "Full Stack Development",
  avatarInitial: "P",
  githubConnected: true,
  githubUsername: "priyasharma-dev",
  currentStreak: NEW_USER_MODE ? 0 : 12,
  longestStreak: 15,
  totalDays: 60,
  completedDays: NEW_USER_MODE ? 0 : 12,
  missedDays: NEW_USER_MODE ? 0 : 1,
  shields: { total: 3, used: 1, remaining: 2 },
  lastActivityMissed: !NEW_USER_MODE, // drives the "missed day" banner
};

export const badges = [
  { id: 1, label: "Day 1 Started", icon: "🚀", unlocked: true },
  { id: 2, label: "7-Day Streak", icon: "🔥", unlocked: true },
  { id: 3, label: "First Shield Used", icon: "🛡️", unlocked: true },
  { id: 4, label: "30-Day Streak", icon: "⚡", unlocked: false },
  { id: 5, label: "Challenge Finisher", icon: "🏆", unlocked: false },
];

// Day 1 -> 60 status map used by the calendar heatmap
export const dayHistory = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  let status = "upcoming";
  if (!NEW_USER_MODE) {
    if (day < 12) status = "completed";
    if (day === 3) status = "shielded";   // protected by a streak shield
    if (day === 8) status = "missed";     // genuinely missed, no shield left that day
    if (day === 12) status = "today";
  } else if (day === 1) {
    status = "today";
  }
  return { day, status };
});

export const dayContent = {
  12: {
    title: "Build a JWT Authentication UI",
    track: "Full Stack Development",
    description:
      "Today you'll build the login and signup screens that most real apps start with. Focus on clean form validation and states — loading, error, and success — not just the visuals.",
    requirements: [
      "Create a Login page with email + password fields",
      "Create a Signup page with validation (min 8 char password)",
      "Add loading & error states to both forms",
      "Push the code to a public GitHub repo",
      "Post your progress on LinkedIn tagging #ABTalks60Days",
    ],
    estMinutes: 90,
  },
};

export const stats = {
  activeStudents: "4,200+",
  colleges: "180+",
  avgStreak: "23 days",
  commitsShipped: "61,000+",
};

// Scrolling proof-of-work ticker on the landing page
export const liveFeed = [
  { name: "Rahul K.", college: "NIT Trichy", action: "shipped Day 34", track: "DSA" },
  { name: "Ananya S.", college: "MNIT Jaipur", action: "hit a 41-day streak", track: "Web Dev" },
  { name: "Vikram P.", college: "BITS Pilani", action: "shipped Day 12", track: "ML" },
  { name: "Sneha R.", college: "VIT Vellore", action: "unlocked 30-Day Streak", track: "App Dev" },
  { name: "Aditya M.", college: "IIT Hyderabad", action: "shipped Day 58", track: "Web Dev" },
  { name: "Kavya N.", college: "IIIT Pune", action: "used a Streak Shield", track: "DSA" },
];