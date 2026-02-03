import { useState } from "react";
import { Input, Select, Textarea } from "../components/ui/Input";
import { API_BASE_URL } from "../config";


const EMPTY_FAMILY = { name: "", relation: "", age: "", occupation: "" };
const EMPTY_EDU = { degree: "", institution: "", year: "", grade: "" };
const EMPTY_EXP = { company: "", role: "", startDate: "", endDate: "" };

export default function CandidateForm({
  initialData = {},
  onSubmit,
  submitting = false,
}) {
  const getFullUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${API_BASE_URL}/${path}`;
  };

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    email: "",
    mobile: "",
    correspondenceAddress: "",
    permanentAddress: "",
    familyDetails: [EMPTY_FAMILY],
    education: [EMPTY_EDU],
    experience: [EMPTY_EXP],
    ...initialData,
  });

  const [documents, setDocuments] = useState({
    photo: null,
    aadharFront: null,
    aadharBack: null,
  });

  const [previews, setPreviews] = useState({
    photo: getFullUrl(initialData?.documents?.photo),
    aadharFront: getFullUrl(initialData?.documents?.aadharFront),
    aadharBack: getFullUrl(initialData?.documents?.aadharBack),
  });

  const isValid =
    form.fullName.trim() &&
    form.email.trim() &&
    form.mobile.trim();

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function updateList(listName, index, field, value) {
    const updated = [...form[listName]];
    updated[index] = { ...updated[index], [field]: value };
    setForm(prev => ({ ...prev, [listName]: updated }));
  }

  function addItem(listName, emptyObj) {
    setForm(prev => ({
      ...prev,
      [listName]: [...prev[listName], emptyObj],
    }));
  }

  function removeItem(listName, index) {
    setForm(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  }

  function handleFileChange(field, file) {
    if (!file) return;
    setDocuments(prev => ({ ...prev, [field]: file }));
    setPreviews(prev => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  }
function copyAddress() {
  setForm(prev => ({
    ...prev,
    permanentAddress: prev.correspondenceAddress,
  }));
}

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form, documents);
      }}
      className="space-y-8 p-6 rounded-xl max-w-5xl"
    >
      <h2 className="text-2xl font-semibold">
        Candidate Details
      </h2>

      {/* BASIC INFO */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Full Name *"
          value={form.fullName}
          onChange={e => updateField("fullName", e.target.value)}
        />

        <input
          type="date"
          value={form.dob}
          onChange={e => updateField("dob", e.target.value)}
          className="input"
        />

        <select
          value={form.gender}
          onChange={e => updateField("gender", e.target.value)}
          className="input"
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          value={form.maritalStatus}
          onChange={e => updateField("maritalStatus", e.target.value)}
          className="input"
        >
          <option value="">Marital Status</option>
          <option>Single</option>
          <option>Married</option>
        </select>

        <Input
          placeholder="Email *"
          value={form.email}
          onChange={e => updateField("email", e.target.value)}
        />

        <Input
          placeholder="Mobile *"
          value={form.mobile}
          onChange={e => updateField("mobile", e.target.value)}
        />
      </div>

{/* ADDRESSES */}
<section className="space-y-3">
  <Textarea
    placeholder="Current Address"
    value={form.correspondenceAddress}
    onChange={e =>
      updateField("correspondenceAddress", e.target.value)
    }
  />

  {/* Copy button (LEFT aligned, clean UI) */}
  <div className="flex items-center">
    <button
      type="button"
      onClick={copyAddress}
      className="
        inline-flex items-center gap-2
        text-sm font-medium
        text-brand
        hover:underline
        transition
      "
    >
      ↳ Same Address
    </button>
  </div>

  <Textarea
    placeholder="Permanent Address"
    value={form.permanentAddress}
    onChange={e =>
      updateField("permanentAddress", e.target.value)
    }
  />
</section>




      {/* FAMILY */}
      <section>
        <h3 className="font-semibold mb-2">
          Family Details
        </h3>

        {form.familyDetails.map((f, i) => (
          <div
            key={i}
            className="grid md:grid-cols-4 gap-2 mb-2"
          >
            <input
              placeholder="Name"
              value={f.name}
              onChange={e =>
                updateList("familyDetails", i, "name", e.target.value)
              }
              className="input"
            />
            <input
              placeholder="Relation"
              value={f.relation}
              onChange={e =>
                updateList("familyDetails", i, "relation", e.target.value)
              }
              className="input"
            />
            <input
              placeholder="Age"
              value={f.age}
              onChange={e =>
                updateList("familyDetails", i, "age", e.target.value)
              }
              className="input"
            />
            <input
              placeholder="Occupation"
              value={f.occupation}
              onChange={e =>
                updateList("familyDetails", i, "occupation", e.target.value)
              }
              className="input"
            />

            {i > 0 && (
              <button
                type="button"
                onClick={() => removeItem("familyDetails", i)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => addItem("familyDetails", EMPTY_FAMILY)}
          className="text-indigo-600 text-sm mt-2"
        >
          + Add Family Member
        </button>
      </section>

      {/* EDUCATION */}
      <section>
        <h3 className="font-semibold mb-2">
          Education
        </h3>

        {form.education.map((e, i) => (
          <div
            key={i}
            className="grid md:grid-cols-4 gap-2 mb-2"
          >
            <input
              placeholder="Degree"
              value={e.degree}
              onChange={v =>
                updateList("education", i, "degree", v.target.value)
              }
              className="input"
            />
            <input
              placeholder="Institution"
              value={e.institution}
              onChange={v =>
                updateList("education", i, "institution", v.target.value)
              }
              className="input"
            />
            <input
              placeholder="Year"
              value={e.year}
              onChange={v =>
                updateList("education", i, "year", v.target.value)
              }
              className="input"
            />
            <input
              placeholder="Grade"
              value={e.grade}
              onChange={v =>
                updateList("education", i, "grade", v.target.value)
              }
              className="input"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => addItem("education", EMPTY_EDU)}
          className="text-indigo-600 text-sm mt-2"
        >
          + Add Education
        </button>
      </section>

      {/* EXPERIENCE */}
      <section>
        <h3 className="font-semibold mb-2">
          Experience
        </h3>

        {form.experience.map((x, i) => (
          <div
            key={i}
            className="grid md:grid-cols-4 gap-2 mb-2"
          >
            <input
              placeholder="Company"
              value={x.company}
              onChange={v =>
                updateList("experience", i, "company", v.target.value)
              }
              className="input"
            />
            <input
              placeholder="Role"
              value={x.role}
              onChange={v =>
                updateList("experience", i, "role", v.target.value)
              }
              className="input"
            />
            <input
              type="date"
              value={x.startDate}
              onChange={v =>
                updateList("experience", i, "startDate", v.target.value)
              }
              className="input"
            />
            <input
              type="date"
              value={x.endDate}
              onChange={v =>
                updateList("experience", i, "endDate", v.target.value)
              }
              className="input"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => addItem("experience", EMPTY_EXP)}
          className="text-indigo-600 text-sm mt-2"
        >
          + Add Experience
        </button>
      </section>

      {/* DOCUMENTS */}
      <section>
        <h3 className="font-semibold mb-3">
          Documents
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: "photo", label: "Photo" },
            { key: "aadharFront", label: "Aadhaar Front" },
            { key: "aadharBack", label: "Aadhaar Back" },
          ].map(({ key, label }) => (
            <div key={key}>
              <p className="text-sm font-medium mb-2">
                {label}
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={e =>
                  handleFileChange(key, e.target.files[0])
                }
              />

              {previews[key] && (
                <img
                  src={previews[key]}
                  className="mt-2 h-32 w-full object-contain rounded border"
                  alt={label}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          disabled={!isValid || submitting}
          className="bg-indigo-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
        >
          Save Candidate
        </button>
      </div>
    </form>
  );
}
