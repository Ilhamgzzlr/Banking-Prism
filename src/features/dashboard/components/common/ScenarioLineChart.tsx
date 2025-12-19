import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type Props = {
  data: any[];
  valueFormatter?: (v: number) => string;
};

export default function ScenarioLineChart({ data, valueFormatter }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-8">
        No chart data available
      </div>
    );
  }

  const values = data.flatMap(d =>
    Object.values(d).filter(v => typeof v === "number")
  ) as number[];

  const min = Math.min(...values);
  const max = Math.max(...values);

  // 🔥 buffer kecil (misal 5% dari range)
  const padding = (max - min) * 0.3 || 0.001;

  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="Date"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[min - padding, max + padding]}
            tickFormatter={valueFormatter}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "12px"
            }}
            labelStyle={{ fontWeight: 600 }}
            formatter={(v: number | undefined) =>
              v !== undefined && valueFormatter ? valueFormatter(v) : v
            }
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", paddingBottom: 16 }}
          />

          <Line
            type="monotone"
            dataKey="Baseline"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            strokeLinecap="round"
          />
          <Line
            type="monotone"
            dataKey="Adverse1"
            stroke="#dc2626"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            strokeLinecap="round"
          />
          <Line
            type="monotone"
            dataKey="Adverse2"
            stroke="#ea580c"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            strokeLinecap="round"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
