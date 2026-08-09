/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dayHistory, student as initialStudent } from "../data/mockData";

const STORAGE_KEY = "abtalks-app-state-v2";
const THEME_KEY = "abtalks-theme";

const AppContext = createContext(null);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.student && Array.isArray(saved.history) && Array.isArray(saved.completedDayNumbers)) return saved;
  } catch {}
  return {
    student: {
      ...initialStudent,
      currentStreak: initialStudent.currentStreak,
      longestStreak: initialStudent.longestStreak,
      completedDays: initialStudent.completedDays,
    },
    history: dayHistory,
    completedDayNumbers: dayHistory.filter((d) => d.status === "completed").map((d) => d.day),
  };
}

function getInitialTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch {
    return "dark";
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const completeDay = (dayNumber) => {
    const alreadyCompleted = state.completedDayNumbers.includes(dayNumber);
    if (alreadyCompleted) return false;

    setState((prev) => {
      if (prev.completedDayNumbers.includes(dayNumber)) return prev;

      const nextStreak = prev.student.currentStreak + 1;
      const nextCompleted = Math.min(prev.student.completedDays + 1, prev.student.totalDays);
      const nextLongest = Math.max(prev.student.longestStreak, nextStreak);

      return {
        ...prev,
        student: {
          ...prev.student,
          currentStreak: nextStreak,
          completedDays: nextCompleted,
          longestStreak: nextLongest,
        },
        completedDayNumbers: [...prev.completedDayNumbers, dayNumber],
        history: prev.history.map((item) =>
          item.day === dayNumber ? { ...item, status: "completed" } : item
        ),
      };
    });

    return true;
  };

  const isDayCompleted = (dayNumber) => state.completedDayNumbers.includes(dayNumber);

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(loadState());
  };

  const value = useMemo(
    () => ({
      student: state.student,
      history: state.history,
      theme,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      completeDay,
      isDayCompleted,
      resetDemo,
    }),
    [state, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
