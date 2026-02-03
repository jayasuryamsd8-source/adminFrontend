import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function StatusDoughnut({ data, total }) {
  return (
    <div className="relative w-[340px] h-[340px]">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-sm text-muted">Total</p>
        <p className="text-5xl font-bold">{total}</p>
        <p className="text-xs text-muted mt-1">Candidates</p>
      </div>

      <Doughnut
        data={{
          labels: data.map(d => d.status),
          datasets: [
            {
              data: data.map(d => d.count),
              backgroundColor: [
                "#3B82F6", // NEW
                "#FACC15", // REVIEWING
                "#06B6D4", // SHORTLISTED
                "#EF4444", // REJECTED
                "#22C55E", // HIRED
              ],
              borderWidth: 6,
              borderColor: "#ffffff",
            },
          ],
        }}
        options={{
          cutout: "70%",
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
}
