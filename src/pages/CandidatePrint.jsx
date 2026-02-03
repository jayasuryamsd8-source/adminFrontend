import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { API_BASE_URL } from "../config";

export default function CandidatePrint() {
  const { id } = useParams();
  const [c, setC] = useState(null);

  useEffect(() => {
    api.get(`/candidates/${id}`).then(res => setC(res.data));
  }, [id]);

  if (!c) return null;

  return (
    <div className="w-full p-6 text-black text-sm">

      {/* ================= PROFILE HEADER (FIXED AREA) ================= */}
      <section
        className="mb-6"
        style={{
          display: "grid",
          gridTemplateColumns: "90px 1fr",
          columnGap: "16px",
          alignItems: "center",
        }}
      >
        {/* LEFT: PHOTO */}
        <div>
          {c.documents?.photo ? (
            <img
              src={c.documents.photo.startsWith("http") ? c.documents.photo : `${API_BASE_URL}/${c.documents.photo}`}
              alt="Candidate"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          ) : (
            <div
              style={{
                width: "80px",
                height: "80px",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
              }}
            >
              No Photo
            </div>
          )}
        </div>

        {/* RIGHT: NAME + STATUS */}
        <div>
          <p style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
            {c.fullName}
          </p>
          <p style={{ margin: "2px 0", fontSize: "13px", color: "#555" }}>
            Candidate Profile
          </p>
          <p style={{ margin: 0, fontSize: "12px" }}>
            Status: <strong>{c.status}</strong>
          </p>
        </div>
      </section>

      {/* ================= BASIC INFORMATION ================= */}
      <section className="mb-6">
        <h3 className="font-semibold border-b mb-2">Basic Information</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Mobile:</strong> {c.mobile}</p>
          <p><strong>Date of Birth:</strong> {c.dateOfBirth}</p>
          <p><strong>Gender:</strong> {c.gender}</p>
          <p><strong>Marital Status:</strong> {c.maritalStatus}</p>
        </div>
      </section>

      {/* ================= ADDRESS ================= */}
      <section className="mb-6">
        <h3 className="font-semibold border-b mb-2">Address</h3>
        <p>{c.correspondenceAddress}</p>
        <p>{c.permanentAddress}</p>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="mb-6">
        <h3 className="font-semibold border-b mb-2">Education</h3>
        {c.education?.length ? (
          c.education.map((e, i) => (
            <p key={i}>
              {e.degree} – {e.institution} {e.year && `(${e.year})`}
            </p>
          ))
        ) : (
          <p>No education details provided</p>
        )}
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section>
        <h3 className="font-semibold border-b mb-2">Experience</h3>
        {c.experience?.length ? (
          c.experience.map((x, i) => (
            <p key={i}>
              {x.role} at {x.company}
            </p>
          ))
        ) : (
          <p>No experience details provided</p>
        )}
      </section>

    </div>
  );
}
