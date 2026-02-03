import { useState } from "react";
import api from "../api/axios";
import Button from "./ui/Button";

export default function DocumentCard({
  candidateId,
  label,
  field,
  value,          // FULL URL or null
  onChange,       // callback from parent
}) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function upload() {
    if (!file) return;

    const form = new FormData();
    form.append(field, file);

    setLoading(true);
    setError(null);

    try {
      const res = await api.post(
        `/candidates/${candidateId}/documents`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // backend returns updated candidate
      onChange(res.data.documents);

      setPreview(null);
      setFile(null);
    } catch {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!window.confirm(`Remove ${label}?`)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.put(`/candidates/${candidateId}`, {
        documents: { [field]: null },
      });

      onChange(res.data.documents);
    } catch {
      setError("Remove failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <p className="text-sm font-semibold text-gray-700">
        {label}
      </p>

      {/* Existing document */}
      {value && !preview && (
        <img
          src={value}
          alt={label}
          className="h-36 w-full object-contain rounded-md border"
        />
      )}

      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-36 w-full object-contain rounded-md border border-dashed"
        />
      )}

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setFile(f);
          setPreview(URL.createObjectURL(f));
        }}
        className="block w-full text-sm text-gray-600"
      />

      {/* Actions */}
      <div className="flex gap-2">
        {preview && (
          <Button size="sm" disabled={loading} onClick={upload}>
            {loading ? "Uploading…" : "Upload"}
          </Button>
        )}

        {value && !preview && (
          <Button
            variant="danger"
            size="sm"
            disabled={loading}
            onClick={remove}
          >
            Remove
          </Button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
