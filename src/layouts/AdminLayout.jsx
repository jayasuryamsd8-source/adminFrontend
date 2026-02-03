import { NavLink, Outlet } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

/* ================= ICONS ================= */
function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" stroke="currentColor" strokeWidth="2" />
      <path d="M14 20c.5-2.2 2.2-3.8 4-3.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UpdatesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 22c5 0 9-4 9-9s-4-9-9-9-9 4-9 9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v6l3.5 2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/candidates", label: "Candidates", icon: UsersIcon },
  { to: "/updates", label: "Updates", icon: UpdatesIcon },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-300">
      
      {/* ================= SIDEBAR (FIXED) ================= */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col border-r sticky top-0 h-screen"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--surface)), rgb(var(--surface-muted)))",
          borderColor: "rgb(var(--border))",
        }}
      >
        {/* Brand */}
        <div
          className="px-6 py-5 border-b"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          <img
            src="/company-logo.png"
            alt="Company Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `
                group flex items-center gap-3 px-3 py-2.5 rounded-xl
                text-sm font-medium transition-all duration-200
                ${isActive ? "shadow-sm" : ""}
              `
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? "rgba(var(--brand), 0.16)"
                  : "transparent",
                color: isActive
                  ? "rgb(var(--brand))"
                  : "rgb(var(--text-secondary))",
              })}
            >
              {/* Icon */}
              <span
                className="flex items-center justify-center"
                style={{ width: 32, height: 32 }}
              >
                <Icon className="w-[26px] h-[26px]" />
              </span>

              {/* Label */}
              <span className="tracking-tight">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          <DarkModeToggle />
        </div>
      </aside>

      {/* ================= MAIN CONTENT (SCROLLS ONLY) ================= */}
      <main
        className="flex-1 h-screen overflow-y-auto p-8 transition-colors duration-300"
        style={{ backgroundColor: "rgb(var(--background))" }}
      >
        <Outlet />
      </main>
    </div>
  );
}
