import { useEffect, useState } from "react";
import api from "../api/axios";
import { API_BASE_URL } from "../config";

/* ================= STAGES ================= */

const STAGES = [
  { key: "NEW", label: "New Candidates", color: "border-blue-500" },
  { key: "REVIEWING", label: "Under Review", color: "border-yellow-500" },
  { key: "SHORTLISTED", label: "Shortlisted Candidates", color: "border-cyan-500" },
  { key: "HIRED", label: "Hired Candidates", color: "border-green-500" },
  { key: "REJECTED", label: "Rejected Candidates", color: "border-red-500" },
];

export default function Updates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CANDIDATES ================= */

  const loadCandidates = async () => {
    const res = await api.get("/candidates");
    setCandidates(res.data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  /* ================= STATUS UPDATE ================= */

  const updateStatus = async (id, status) => {
    // optimistic UI
    setCandidates(prev =>
      prev.map(c =>
        c._id === id ? { ...c, status } : c
      )
    );

    try {
      await api.put(`/candidates/${id}`, { status });
    } catch {
      await loadCandidates();
    }
  };

  /* ================= GROUP BY STATUS ================= */

  const grouped = Object.fromEntries(
    STAGES.map(stage => [
      stage.key,
      candidates.filter(
        c => (c.status || "").toUpperCase() === stage.key
      ),
    ])
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted">Loading candidates…</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">

      {/* ===== PAGE HEADER ===== */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Recruitment Control Panel
        </h1>
        <p className="text-muted">
          Review, shortlist, hire, or reject candidates in a controlled workflow
        </p>
      </header>

      {/* ===== STAGES ===== */}
      {STAGES.map(stage => (
        <section key={stage.key} className="space-y-3">

          {/* STAGE HEADER */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {stage.label}
            </h2>
            <span className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
              {grouped[stage.key].length}
            </span>
          </div>

          {/* STAGE CARD */}
          <div
            className={`
              bg-white dark:bg-slate-900
              rounded-xl border-t-4 ${stage.color}
              shadow-sm
            `}
          >
            {grouped[stage.key].length === 0 ? (
              <div className="p-8 text-center text-muted">
                No candidates
              </div>
            ) : (
              <div className="divide-y">
                {grouped[stage.key].map(c => (
                  <CandidateRow
                    key={c._id}
                    c={c}
                    updateStatus={updateStatus}
                  />
                ))}
              </div>
            )}
          </div>

        </section>
      ))}
    </div>
  );
}

/* ================= CANDIDATE ROW ================= */

function CandidateRow({ c, updateStatus }) {
  const status = c.status;

  return (
    <div className="flex items-center justify-between p-4">

      {/* LEFT: PROFILE (PHOTO FIXED) */}
      <div className="flex items-center gap-4">

        {c.documents?.photo ? (
          <img
            src={`${API_BASE_URL}/${c.documents.photo}`}
            alt={c.fullName}
            className="w-10 h-10 rounded-full object-cover border"
          />
        ) : (
          <div className="
            w-10 h-10 rounded-full
            bg-cyan-100 text-cyan-700
            flex items-center justify-center
            font-semibold
          ">
            {c.fullName?.[0]?.toUpperCase()}
          </div>
        )}

        <div>
          <p className="font-medium">{c.fullName}</p>
          <p className="text-sm text-muted">{c.email}</p>
        </div>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex gap-2">

        {status === "NEW" && (
          <Btn onClick={() => updateStatus(c._id, "REVIEWING")}>
            Review
          </Btn>
        )}

        {status === "REVIEWING" && (
          <>
            <Btn
              primary
              onClick={() => updateStatus(c._id, "SHORTLISTED")}
            >
              Shortlist
            </Btn>
            <Btn
              danger
              onClick={() => updateStatus(c._id, "REJECTED")}
            >
              Reject
            </Btn>
          </>
        )}

        {status === "SHORTLISTED" && (
          <>
            <Btn
              primary
              onClick={() => updateStatus(c._id, "HIRED")}
            >
              Hire
            </Btn>
            <Btn
              danger
              onClick={() => updateStatus(c._id, "REJECTED")}
            >
              Reject
            </Btn>
          </>
        )}

      </div>
    </div>
  );
}

/* ================= BUTTON ================= */

function Btn({ children, onClick, primary, danger }) {
  let cls = "text-sm px-3 py-1.5 rounded-md border transition ";

  if (primary)
    cls += "bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700";
  else if (danger)
    cls += "bg-red-500 text-white border-red-500 hover:bg-red-600";
  else
    cls += "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700";

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
