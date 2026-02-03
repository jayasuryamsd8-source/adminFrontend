import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Avatar from "./Avatar";

export default function CandidateRow({ c }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 flex items-center gap-3">
        <Avatar name={c.fullName} photo={c.documents?.photo} size={40} />
        <Link
          to={`/candidates/${c._id}`}
          className="text-indigo-600 hover:underline font-medium"
        >
          {c.fullName}
        </Link>
      </td>
      <td className="p-3">{c.email}</td>
      <td className="p-3">{c.mobile}</td>
      <td className="p-3">
        <StatusBadge status={c.status} />
      </td>
    </tr>
  );
}