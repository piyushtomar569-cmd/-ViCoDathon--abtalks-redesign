const statusStyles = {
  completed: "bg-gradient-to-br from-flame-400 to-flame-600",
  shielded: "bg-gradient-to-br from-brand-400 to-brand-600",
  missed: "bg-surface2 border border-red-500/40",
  today: "bg-white text-base ring-2 ring-flame-500 ring-offset-2 ring-offset-base animate-pulseRing",
  upcoming: "bg-surface2 text-gray-600",
};

export default function CalendarHeatmap({ days }) {
  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
        {days.map(({ day, status }, i) => (
          <div
            key={day}
            title={`Day ${day}: ${status}`}
            className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-semibold transition-transform duration-200 hover:scale-125 hover:z-10 cursor-default animate-popIn ${statusStyles[status]}`}
            style={{ animationDelay: `${Math.min(i * 0.012, 0.5)}s` }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-[11px] text-gray-400">
        <Legend color="from-flame-400 to-flame-600" label="Done" />
        <Legend color="from-brand-400 to-brand-600" label="Shielded" />
        <Legend color="bg-surface2 border border-red-500/40" label="Missed" plain />
        <Legend color="bg-surface2" label="Upcoming" plain />
      </div>
    </div>
  );
}

function Legend({ color, label, plain }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded ${plain ? color : `bg-gradient-to-br ${color}`}`} />
      {label}
    </div>
  );
}
