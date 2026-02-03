import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import CountUp from "../components/CountUp";
import StatusBarChart from "../components/StatusBarChart";
import StatusDoughnut from "../components/StatusDoughnut";
import WeeklyTrend from "../components/WeeklyTrend";

/* ================= KPI COLORS ================= */

const COLORS = {
  TOTAL: "from-indigo-500 to-indigo-700",
  NEW: "from-blue-500 to-blue-700",
  REVIEWING: "from-yellow-400 to-yellow-600",
  SHORTLISTED: "from-cyan-500 to-cyan-700",
  REJECTED: "from-red-500 to-red-700",
  HIRED: "from-emerald-500 to-emerald-700",
  CONVERSION: "from-purple-500 via-pink-500 to-indigo-500",
};

/* ================= STATUS ORDER ================= */

const STATUS_ORDER = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "REJECTED",
  "HIRED",
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= LOAD STATS ================= */

  useEffect(() => {
    api.get("/candidates/stats").then(res => {
      setStats(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted">Loading analytics…</p>
      </div>
    );
  }

  /* ================= DERIVED METRICS ================= */

  const conversion =
    stats.SHORTLISTED > 0
      ? Math.round((stats.HIRED / stats.SHORTLISTED) * 100)
      : 0;

  const goTo = status =>
    navigate(status ? `/candidates?status=${status}` : "/candidates");

  /* ================= CHART DATA ================= */

  const chartData = STATUS_ORDER.map(key => ({
    status: key,
    count: stats[key],
  }));

  /* ================= RENDER ================= */

  return (
    <div className="space-y-16">

      {/* ================= HEADER ================= */}
      <section className="
        rounded-xl px-8 py-6
        bg-gradient-to-r from-indigo-600 to-cyan-500
        text-white
      ">
        <h1 className="text-3xl font-semibold">
          Recruitment Analytics
        </h1>

        <div className="flex items-center gap-3 mt-2">
          <p className="text-white/90 text-sm">
            Real-time hiring pipeline overview
          </p>

          <span className="
            inline-flex items-center gap-1.5
            rounded-full px-3 py-0.5 text-xs font-semibold
            bg-white/20
          ">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            LIVE DATA
          </span>
        </div>
      </section>

      {/* ================= CIRCULAR KPI ROW ================= */}
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-10 justify-items-center">

        <CircleKpi
          label="Total"
          value={stats.total}
          color={COLORS.TOTAL}
          onClick={() => goTo()}
        />

        {STATUS_ORDER.map(key => (
          <CircleKpi
            key={key}
            label={key}
            value={stats[key]}
            color={COLORS[key]}
            onClick={() => goTo(key)}
          />
        ))}

        <CircleKpi
          label="Shortlist → Hire"
          value={conversion}
          suffix="%"
          subtitle="Conversion"
          color={COLORS.CONVERSION}
        />

      </section>

      {/* ================= BAR CHART ================= */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">
          Hiring Pipeline Overview
        </h2>

        <div className="h-[280px]">
          <StatusBarChart data={chartData} />
        </div>
      </section>

      {/* ================= TREND + DISTRIBUTION ================= */}
      <section className="grid lg:grid-cols-2 gap-12 items-stretch">

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Weekly Hiring Trend
          </h2>
          <div className="h-[260px]">
            <WeeklyTrend />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-6">
            Candidate Distribution
          </h2>
          <StatusDoughnut
  data={chartData}
  total={stats.total}
/>

        </div>

      </section>

    </div>
  );
}

/* ================= PURE CIRCLE KPI ================= */

function CircleKpi({ label, value, suffix = "", subtitle, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-4 focus:outline-none group"
    >
      <div
        className={`
          w-28 h-28 rounded-full
          bg-gradient-to-br ${color}
          flex flex-col items-center justify-center
          text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.25)]
          transition
          group-hover:scale-105
        `}
      >
        <span className="text-3xl font-bold leading-none">
          <CountUp value={value} />{suffix}
        </span>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
}
