import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
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

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="Date"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={(v: number | undefined) =>
              v !== undefined && valueFormatter ? valueFormatter(v) : v
            }
          />
          <Legend />

          <Line
            type="monotone"
            dataKey="Baseline"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Adverse1"
            stroke="#dc2626"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Adverse2"
            stroke="#ea580c"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
