// src/components/StatusSelector.jsx
import { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "../utils/constants";
import api from "../api/axios";

export default function StatusSelector({
  candidateId,
  currentStatus,
  onStatusChange,
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  async function handleChange(next) {
    if (next === status) return;

    const previous = status;
    setStatus(next);
    setLoading(true);

    try {
      await api.put(`/candidates/${candidateId}`, { status: next });
      if (onStatusChange) {
        onStatusChange(next);
      }
    } catch {
      setStatus(previous);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
        className="border border-border rounded-lg px-3 py-2
             transition-colors duration-200
             focus:outline-none focus:shadow-focus"
        aria-label="Candidate status"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <span className="text-xs text-gray-400">
        Changing status updates dashboard counts
      </span>
    </div>
  );
}
