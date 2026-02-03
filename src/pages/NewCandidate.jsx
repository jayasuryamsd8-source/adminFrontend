import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function NewCandidate() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    email: "",
    mobile: "",
  });

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        ...form,
        status: "NEW", // 🔥 REQUIRED
      };

      await api.post("/candidates", payload);
      navigate("/updates"); // or /candidates
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create candidate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="card p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">New Candidate</h1>
          <p className="text-muted">Add candidate details</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="card p-4 border-red-300 bg-red-50 text-red-600">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="card p-6 space-y-6">
        <h2 className="text-lg font-semibold">Candidate Details</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          {/* ✅ FIXED DATE */}
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Saving..." : "Create Candidate"}
          </button>
        </div>
      </form>
    </div>
  );
}
