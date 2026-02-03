import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import CandidateList from "./pages/CandidateList";
import CandidateCreate from "./pages/CandidateCreate";
import CandidateDetail from "./pages/CandidateDetail";
import CandidateEdit from "./pages/CandidateEdit";
import PublicCandidateForm from "./pages/PublicCandidateForm";
import Updates from "./pages/Updates";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/apply" element={<PublicCandidateForm />} />

      {/* ADMIN */}
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<CandidateList />} />
        <Route path="/candidates/new" element={<CandidateCreate />} />
        <Route path="/candidates/:id" element={<CandidateDetail />} />
        <Route path="/candidates/:id/edit" element={<CandidateEdit />} />
        <Route path="/updates" element={<Updates />} />
      </Route>
    </Routes>
  );
}
