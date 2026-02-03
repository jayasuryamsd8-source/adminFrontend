import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import Pagination from "../components/Pagination";
import Button from "../components/ui/Button";
import Avatar from "../components/Avatar";
import { exportCandidatesCSV } from "../utils/exportCsv";
import { useRole } from "../context/RoleContext";
import { API_BASE_URL } from "../config";

const LIMIT = 10;
const STATUSES = ["", "NEW", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"];

export default function CandidateList() {
  const role = useRole();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const s = searchParams.get("status");
    if (s && STATUSES.includes(s)) {
      setStatus(s);
      setPage(1);
    } else {
      setStatus("");
    }
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    api
      .get("/candidates", {
        params: {
          page,
          limit: LIMIT,
          search: search || undefined,
          status: status || undefined,
        },
      })
      .then(res => {
        if (!active) return;
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Failed to load candidates.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, search, status]);

  async function handleDelete(candidateId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?\nThis action cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(candidateId);

    try {
      await api.delete(`/candidates/${candidateId}`);
      setItems(prev => prev.filter(c => c._id !== candidateId));
      setTotal(prev => Math.max(0, prev - 1));
      if (items.length === 1 && page > 1) setPage(page - 1);
    } catch {
      alert("Failed to delete candidate.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-muted">Loading candidates…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-4">
        <p className="text-sm text-red-600">{error}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ================= HEADER ================= */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Candidates</h1>
          <p className="text-muted">
            Manage and review all candidate applications.
          </p>
        </div>

        {role === "ADMIN" && (
          <Link to="/candidates/new">
            <Button>
              Add Candidate
            </Button>
          </Link>
        )}
      </header>

      {/* ================= FILTERS ================= */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            placeholder="Search"
            value={search}
            onChange={e => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            value={status}
            onChange={e => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>
                {s || "All Statuses"}
              </option>
            ))}
          </select>

          <div className="flex-1" />

          <Button
            variant="secondary"
            onClick={() => exportCandidatesCSV(items)}
            disabled={!items.length}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "rgb(var(--surface-muted))" }}>
            <tr>
              <th className="px-4 py-3 text-xs text-muted text-left">Candidate</th>
              <th className="px-4 py-3 text-xs text-muted text-left">Email</th>
              <th className="px-4 py-3 text-xs text-muted text-left">Mobile</th>
              <th className="px-4 py-3 text-xs text-muted text-left">Status</th>
              <th className="px-4 py-3 text-xs text-muted text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-muted">
                  No candidates found.
                </td>
              </tr>
            ) : (
              items.map(c => (
                <tr key={c._id} className="table-row">
                  <td className="px-4 py-3">
                    <Link
                      to={`/candidates/${c._id}`}
                      className="inline-flex items-center gap-3 font-medium text-brand hover:underline"
                    >
                      <Avatar name={c.fullName} photo={c.documents?.photo} size={32} />
                      {c.fullName}
                    </Link>
                  </td>

                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.mobile}</td>

                  <td className="px-4 py-3">
                    <span className={`status-badge status-${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    {role === "ADMIN" && (
                      <Button
                        variant="destructive"
                        disabled={deletingId === c._id}
                        onClick={() => handleDelete(c._id)}
                      >
                        {deletingId === c._id ? "Deleting…" : "Delete"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <Pagination
        page={page}
        limit={LIMIT}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
