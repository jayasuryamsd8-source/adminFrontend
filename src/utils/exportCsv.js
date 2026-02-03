export function exportCandidatesCSV(candidates) {
  const headers = ["Full Name", "Email", "Mobile", "Status", "Created At"];

  const rows = candidates.map(c => [
    c.fullName,
    c.email,
    c.mobile,
    c.status,
    new Date(c.createdAt).toLocaleDateString(),
  ]);

  const csv = [headers, ...rows]
    .map(r => r.map(v => `"${v ?? ""}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "candidates.csv";
  a.click();

  URL.revokeObjectURL(url);
}
