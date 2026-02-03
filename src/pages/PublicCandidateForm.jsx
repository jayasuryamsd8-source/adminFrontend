// src/pages/PublicCandidateForm.jsx
import { useState } from "react";
import api from "../api/axios";
import CandidateForm from "../forms/CandidateForm";
import Button from "../components/ui/Button";

export default function PublicCandidateForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      setError(null);

      // status will be NEW by backend default
      await api.post("/candidates", data);

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "Failed to submit application. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            Candidate Application
          </h1>
          <p className="text-sm text-gray-500">
            Please complete the form below. All information provided will be
            reviewed by our HR team.
          </p>
        </header>

        {/* Success message */}
        {success && (
          <div
            role="alert"
            className="rounded-xl bg-green-50 border border-green-200 px-6 py-5 text-sm text-green-800 text-center"
          >
            <p className="font-medium">
              Application submitted successfully.
            </p>
            <p className="mt-1">
              Our HR team will review your profile and contact you if you are
              shortlisted.
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="rounded-xl bg-red-50 border border-red-200 px-6 py-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Form */}
        {!success && (
          <section className="bg-surface dark:bg-slate-800 rounded-xl shadow-card p-6 transition-colors">
            <CandidateForm
              onSubmit={handleSubmit}
              submitLabel={null}
            />

            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                form="candidate-form"
              >
                Submit Application
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
