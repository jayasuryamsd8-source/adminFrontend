import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function StatusBarChart({ data }) {
  return (
    <Bar
      data={{
        labels: data.map(d => d.status),
        datasets: [
          {
            data: data.map(d => d.count),
            backgroundColor: [
              "#3B82F6",
              "#FACC15",
              "#06B6D4",
              "#EF4444",
              "#22C55E",
            ],
            borderRadius: 10,
            barThickness: 42,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
          },
        },
      }}
    />
  );
}
