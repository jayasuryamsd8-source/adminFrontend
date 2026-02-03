import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="
        group flex items-center gap-2
        rounded-full px-3 py-2
        border
        transition-all duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[rgb(var(--brand))]
        
        /* LIGHT MODE */
        bg-surface border-border text-slate-700
        hover:bg-surface-muted

        /* DARK MODE */
        dark:bg-slate-800
        dark:border-slate-700
        dark:text-slate-200
        dark:hover:bg-slate-700
        dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]
      "
    >
      {/* Icon bubble */}
      <span
        className="
          flex h-6 w-6 items-center justify-center
          rounded-full
          text-sm
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        {dark ? "🌙" : "☀️"}
      </span>

      {/* Label */}
      <span className="text-xs font-medium tracking-wide select-none">
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
