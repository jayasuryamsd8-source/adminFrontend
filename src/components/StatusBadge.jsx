// src/components/StatusBarChart.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

export default function StatusBarChart({ data }) {
  const chartData = {
    labels: data.map(d => d.status),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: [
          "#3B82F6", // NEW - Blue
          "#FACC15", // REVIEWING - Yellow
          "#06B6D4", // SHORTLISTED - Cyan
          "#EF4444", // REJECTED - Red
          "#22C55E", // HIRED - Green
        ],
        borderRadius: 10,
        barThickness: 48,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#E5E7EB",
        bodyColor: "#E5E7EB",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748B",
          font: { weight: "600" },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: "#64748B",
        },
        grid: {
          color: "rgba(148,163,184,0.15)",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
