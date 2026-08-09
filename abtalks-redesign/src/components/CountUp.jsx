import { useEffect, useRef, useState } from "react";

/**
 * Animates a number counting up from 0 once it scrolls into view.
 * Accepts values like "4,200+" or "61,000+" or "23 days" — it pulls the
 * first numeric chunk out, animates that, and re-assembles the prefix/suffix.
 */
export default function CountUp({ value, duration = 1200 }) {
  const match = String(value).match(/^([^\d]*)([\d,]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[3] : "";
  const hasNumber = Boolean(match);

  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!hasNumber) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNumber, target, duration]);

  if (!hasNumber) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
