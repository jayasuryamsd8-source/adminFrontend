import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { API_BASE_URL } from "../config";

export default function CandidateDetail() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    api
      .get(`/candidates/${id}`)
      .then((res) => setC(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          console.error(err);
        }
      });
  }, [id]);

  if (notFound) return <p className="p-6">Candidate not found.</p>;
  if (!c) return null;

  // ✅ ABSOLUTE IMAGE URL (CRITICAL FIX)
  const getFullUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${API_BASE_URL}/${path}`;
  };

  const profilePhoto = getFullUrl(c.documents?.photo);

  return (
    <div className="print-area max-w-4xl mx-auto p-10 print:p-0">
      {/* ================= LETTERHEAD (PRINT ONLY) ================= */}
      <div className="hidden print:flex items-center justify-between border-b pb-4 mb-8">
        <div className="flex items-center gap-3">
          <img
            src="/company-logo.png"
            alt="Company Logo"
            className="h-10"
          />
        </div>
        <span className="text-sm text-muted">Candidate Profile</span>
      </div>

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex gap-6 items-start">
          {/* ✅ PROFILE IMAGE FIX */}
          {profilePhoto ? (
            <img
  src={profilePhoto}
  alt="Profile"
  onError={(e) => (e.currentTarget.style.display = "none")}
  className="profile-photo"
/>

          ) : (
            <div className="profile-photo placeholder">
              No Photo
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold">{c.fullName}</h1>
            <p className="text-muted">Candidate Profile</p>
            <p className="text-sm text-muted">
              Status: <strong>{c.status}</strong>
            </p>
          </div>
        </div>

        {/* PRINT BUTTON */}
        <button
          onClick={() => {
            const originalTitle = document.title;
            document.title = `${c.fullName}_Profile`;
            window.print();
            document.title = originalTitle;
          }}
          className="print:hidden btn-secondary"
        >
          Print PDF
        </button>
      </div>

      {/* ================= BASIC INFO ================= */}
      <Section title="Basic Information">
        <Grid>
          <Item label="Email" value={c.email} />
          <Item label="Mobile" value={c.mobile} />
          <Item label="Date of Birth" value={formatDate(c.dob)} />
          <Item label="Gender" value={c.gender || "-"} />
          <Item label="Marital Status" value={c.maritalStatus || "-"} />
        </Grid>
      </Section>

      {/* ================= ADDRESS ================= */}
      <Section title="Address">
        <p className="whitespace-pre-line">
          {c.correspondenceAddress || "-"}
        </p>
        <p className="whitespace-pre-line mt-3">
          {c.permanentAddress || "-"}
        </p>
      </Section>

      {/* ================= EDUCATION ================= */}
      <Section title="Education">
        {c.education?.length ? (
          c.education.map((e, i) => (
            <Row
              key={i}
              left={`${e.degree || "-"} (${e.year || "-"})`}
              right={e.institution || "-"}
            />
          ))
        ) : (
          <Muted>No education details provided</Muted>
        )}
      </Section>

      {/* ================= EXPERIENCE ================= */}
      <Section title="Experience">
        {c.experience?.length ? (
          c.experience.map((x, i) => (
            <Row key={i} left={x.role || "-"} right={x.company || "-"} />
          ))
        ) : (
          <Muted>No experience details provided</Muted>
        )}
      </Section>

      {/* ================= DOCUMENTS ================= */}
      <Section title="Documents">
        <div className="grid grid-cols-2 gap-6">
          {c.documents?.aadharFront && (
            <Doc
              label="Aadhaar Front"
              src={getFullUrl(c.documents.aadharFront)}
            />
          )}
          {c.documents?.aadharBack && (
            <Doc
              label="Aadhaar Back"
              src={getFullUrl(c.documents.aadharBack)}
            />
          )}
        </div>
      </Section>

      {/* ================= FOOTER (PRINT ONLY) ================= */}
      <div className="hidden print:block mt-16 pt-8 border-t">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-muted">Printed on</p>
            <p className="font-medium">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm mb-8 text-muted">
              HR Authorized Signature
            </p>
            <div className="w-48 border-t" />
            <p className="text-sm mt-2">HR Department</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-2 gap-6">{children}</div>;
}

function Item({ label, value }) {
  return (
    <div>
      <p className="text-sm text-muted">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Row({ left, right }) {
  return (
    <div className="flex justify-between py-3 border-b">
      <span className="font-medium">{left}</span>
      <span className="text-muted">{right}</span>
    </div>
  );
}

function Doc({ label, src }) {
  return (
    <div>
      <p className="text-sm mb-2">{label}</p>
      <img
        src={src}
        alt={label}
        className="doc-image"
      />
    </div>
  );
}

function Muted({ children }) {
  return <p className="text-sm text-muted">{children}</p>;
}

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString();
}
