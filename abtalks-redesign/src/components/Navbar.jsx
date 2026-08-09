import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, CalendarDays, Bell, Flame } from "lucide-react";
import { useApp } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", path: "/", icon: Home },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Today", path: "/day/12", icon: CalendarDays },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { student } = useApp();
  const activeIndex = Math.max(links.findIndex((l) => l.path === pathname), 0);

  return (
    <>
      <header className="navbar-header sticky top-0 z-40 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
          <Link to="/" className="flex items-center gap-1.5 group">
            <Flame className="w-6 h-6 text-flame-500 transition-transform group-hover:scale-110 group-hover:-rotate-6" fill="currentColor" />
            <span className="text-lg font-bold tracking-tight font-display">ABTalks</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button aria-label="Notifications" className="notif-btn press relative w-9 h-9 rounded-full flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4 text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulseRing" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-flame-500 flex items-center justify-center font-bold text-sm shadow-md shadow-brand-600/30">
              {student.avatarInitial}
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar-bottom fixed bottom-0 left-0 w-full z-40 backdrop-blur-lg border-t border-border">
        <div className="max-w-xl mx-auto relative grid grid-cols-3 py-2 px-2 sm:px-0">
          <span
            className="absolute top-1 bottom-1 w-1/3 rounded-xl bg-flame-500/10 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />

          {links.map(({ name, path, icon: Icon }, i) => {
            const active = i === activeIndex && pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="press flex flex-col items-center gap-0.5 py-1.5 relative"
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    active ? "text-flame-500 -translate-y-0.5" : "text-gray-500"
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={`text-[11px] transition-colors duration-300 ${active ? "text-flame-500 font-semibold" : "text-gray-500"}`}>
                  {name}
                </span>
                {active && <span className="absolute -top-2 w-1 h-1 rounded-full bg-flame-500 animate-popIn" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
