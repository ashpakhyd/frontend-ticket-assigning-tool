"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetTicketStatusChartQuery } from "@/store/api/dashboardApi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TicketStatusChart() {
  const { data, isLoading } = useGetTicketStatusChartQuery();
  if (isLoading) return <p className="loading">Loading chart…</p>;

  const chartData = {
    labels: data?.map(d => d._id) || [],
    datasets: [
      {
        data: data?.map(d => d.count) || [],
        backgroundColor: [
          '#ef4444', // NEW - Red
          '#f59e0b', // ASSIGNED - Orange  
          '#3b82f6', // IN_PROGRESS - Blue
          '#10b981', // COMPLETED - Green
          '#6b7280', // CLOSED - Gray
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="glass-panel">
      <h3>Ticket Status Distribution</h3>
      <div className="chart-container">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
