import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ScenarioBarChart({ data }: { data: any[] }) {
  if (!data?.length) return null;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="Baseline" fill="#2563eb" />
          <Bar dataKey="Adverse1" fill="#dc2626" />
          <Bar dataKey="Adverse2" fill="#ea580c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
