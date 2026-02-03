import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CandidateForm from "../forms/CandidateForm";
import Button from "../components/ui/Button";

export default function CandidateCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(formData, documents) {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Create candidate
      const res = await api.post("/candidates", formData);
      const candidateId = res.data._id;

      // 2️⃣ Upload documents (optional)
      const fd = new FormData();
      if (documents?.photo) fd.append("photo", documents.photo);
      if (documents?.aadharFront) fd.append("aadharFront", documents.aadharFront);
      if (documents?.aadharBack) fd.append("aadharBack", documents.aadharBack);

      if ([...fd.keys()].length > 0) {
        await api.post(`/candidates/${candidateId}/documents`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3️⃣ Navigate to profile
      navigate(`/candidates/${candidateId}`);
    } catch {
      setError("Failed to create candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* ================= HERO HEADER ================= */}
      <section
        className="
          relative overflow-hidden
          rounded-2xl border p-8
          transition-colors
        "
        style={{
          background:
            "linear-gradient(135deg, rgb(var(--surface)), rgb(var(--surface-muted)))",
          borderColor: "rgb(var(--border))",
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">
              New Candidate
            </h1>
            <p className="text-sm text-muted max-w-xl">
              ADD DETAILS
            </p>
          </div>

          {/* ✅ Dark-mode safe secondary button */}
          <Button
            variant="secondary"
            onClick={() => navigate("/candidates")}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </section>

      {/* ================= ERROR STATE ================= */}
      {error && (
        <div
          role="alert"
          className="rounded-xl px-4 py-3 text-sm border"
          style={{
            backgroundColor: "rgb(254 226 226)",
            color: "rgb(153 27 27)",
            borderColor: "rgb(254 202 202)",
          }}
        >
          {error}
        </div>
      )}

      {/* ================= FORM SURFACE ================= */}
      <section
        className="
          card p-8
          transition-all duration-200
        "
      >
        <CandidateForm
          onSubmit={handleSubmit}
          submitting={loading}
        />
      </section>
    </div>
  );
}
