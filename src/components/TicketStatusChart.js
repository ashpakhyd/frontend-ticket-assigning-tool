"use client";
import { PieChart, Pie, Tooltip } from "recharts";
import { useGetTicketStatusChartQuery } from "@/store/api/dashboardApi";

export default function TicketStatusChart() {
  const { data, isLoading } = useGetTicketStatusChartQuery();
  if (isLoading) return <p className="loading">Loading chart…</p>;

  const chartData = data.map((d) => ({
    name: d._id,
    value: d.count,
  }));

  return (
    <div className="glass-panel">
      <h3>Ticket Status</h3>

      <div className="chart-wrap">
        <PieChart width={260} height={260}>
          <Pie data={chartData} dataKey="value" nameKey="name" label />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
