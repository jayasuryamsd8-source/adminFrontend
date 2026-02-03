export default function StatusPercentage({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return <p className="text-gray-500">No data available</p>;
  }

  return (
    <ul className="space-y-1 text-sm">
      {data.map(d => (
        <li key={d.status} className="flex justify-between">
          <span>{d.status}</span>
          <span>
            {((d.count / total) * 100).toFixed(1)}%
          </span>
        </li>
      ))}
    </ul>
  );
}
