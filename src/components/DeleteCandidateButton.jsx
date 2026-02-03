// src/components/DeleteCandidateButton.jsx
import { useState } from "react";
import api from "../api/axios";

export default function DeleteCandidateButton({ candidateId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?\nThis action cannot be undone."
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await api.delete(`/candidates/${candidateId}`);
      onDeleted(candidateId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
    variant="destructive"
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
    >
      Delete
    </button>
  );
}
