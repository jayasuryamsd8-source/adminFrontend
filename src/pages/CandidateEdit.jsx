import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import CandidateForm from "../forms/CandidateForm";
import Button from "../components/ui/Button";

export default function CandidateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load existing candidate data
  useEffect(() => {
    let mounted = true;

    api
      .get(`/candidates/${id}`)
      .then(res => {
        if (mounted) {
          setCandidate(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load candidate details.");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p className="text-sm text-text-muted">Loading candidate…</p>
      </div>
    );
  }

  // Not found / error
  if (!candidate) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        <p className="text-sm text-danger">
          Candidate not found.
        </p>
        <Button
          variant="secondary"
          onClick={() => navigate("/candidates")}
        >
          Back to Candidates
        </Button>
      </div>
    );
  }

  // Save handler
  async function handleSubmit(data) {
    try {
      setSaving(true);
      setError(null);

      await api.put(`/candidates/${id}`, data);

      // Navigate after successful update
      navigate(`/candidates/${id}`);
    } catch {
      setError("Failed to update candidate. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Edit Candidate
          </h1>
          <p className="text-sm text-text-muted">
            Update personal, educational, and professional details.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate(`/candidates/${id}`)}
        >
          Cancel
        </Button>
      </header>

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="rounded-md bg-danger-subtle text-danger px-4 py-3 text-sm"
        >
          {error}
        </div>
      )}

      {/* Form card */}
      <section className="card p-6">
        <CandidateForm
          initialData={candidate}
          onSubmit={handleSubmit}
        />

        {/* Footer actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(`/candidates/${id}`)}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            loading={saving}
            form="candidate-form"
          >
            Save Changes
          </Button>
        </div>
      </section>
    </div>
  );
}
