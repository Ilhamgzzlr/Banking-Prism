// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// type Props = {
//   data: any[];
//   valueFormatter?: (v: number) => string;
// };

// export default function ScenarioLineChart({ data, valueFormatter }: Props) {
//   if (!data || data.length === 0) {
//     return (
//       <div className="text-sm text-gray-500 text-center py-8">
//         No chart data available
//       </div>
//     );
//   }

//   const values = data.flatMap(d =>
//     Object.values(d).filter(v => typeof v === "number")
//   ) as number[];

//   const min = Math.min(...values);
//   const max = Math.max(...values);

//   // 🔥 buffer kecil (misal 5% dari range)
//   const padding = (max - min) * 0.3 || 0.001;

//   return (
//     <div className="w-full h-[420px]">
//       <ResponsiveContainer>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

//           <XAxis
//             dataKey="Date"
//             tick={{ fontSize: 12, fill: "#6b7280" }}
//             axisLine={false}
//             tickLine={false}
//           />

//           <YAxis
//             domain={[min - padding, max + padding]}
//             tickFormatter={valueFormatter}
//             tick={{ fontSize: 12, fill: "#6b7280" }}
//             axisLine={false}
//             tickLine={false}
//             tickCount={6}
//           />

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#ffffff",
//               borderRadius: "8px",
//               border: "1px solid #e5e7eb",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//               fontSize: "12px"
//             }}
//             labelStyle={{ fontWeight: 600 }}
//             formatter={(v: number | undefined) =>
//               v !== undefined && valueFormatter ? valueFormatter(v) : v
//             }
//           />

//           <Legend
//             verticalAlign="top"
//             align="right"
//             iconType="circle"
//             iconSize={8}
//             wrapperStyle={{ fontSize: "12px", paddingBottom: 16 }}
//           />

//           <Line
//             type="monotone"
//             dataKey="Baseline"
//             stroke="#2563eb"
//             strokeWidth={2.5}
//             dot={false}
//             activeDot={{ r: 4 }}
//             strokeLinecap="round"
//           />
//           <Line
//             type="monotone"
//             dataKey="Adverse1"
//             stroke="#dc2626"
//             strokeWidth={2.5}
//             dot={false}
//             activeDot={{ r: 4 }}
//             strokeLinecap="round"
//           />
//           <Line
//             type="monotone"
//             dataKey="Adverse2"
//             stroke="#ea580c"
//             strokeWidth={2.5}
//             dot={false}
//             activeDot={{ r: 4 }}
//             strokeLinecap="round"
//           />
//         </LineChart>
//       </ResponsiveContainer>

//     </div>
//   );
// }

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScenarioLineChartProps {
  data: any[];
  valueFormatter?: (value: number) => string;
}

const SCENARIO_COLORS: Record<string, string> = {
  Baseline: '#3b82f6',    // blue
  Adverse1: '#f59e0b',    // amber
  Adverse2: '#ef4444',    // red
  Adverse3: '#8b5cf6',    // violet
};

const ScenarioLineChart = ({ data, valueFormatter }: ScenarioLineChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  // Extract scenario names from the first data point (excluding 'date')
  const scenarios = Object.keys(data[0] || {}).filter(key => key !== 'date');

  // Calculate min and max values for Y-axis domain
  const allValues: number[] = [];
  data.forEach(point => {
    scenarios.forEach(scenario => {
      if (point[scenario] !== undefined && point[scenario] !== null) {
        allValues.push(point[scenario]);
      }
    });
  });

  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  
  // Add 5% padding to min and max for better visualization
  const padding = (maxValue - minValue) * 0.05;
  const yAxisDomain = [
    Math.floor((minValue - padding) * 10000) / 10000,
    Math.ceil((maxValue + padding) * 10000) / 10000
  ];

  const formatTooltipValue = (value: number | undefined) => {
    if (value === undefined || value === null) return 'N/A';
    if (valueFormatter) {
      return valueFormatter(value);
    }
    return value.toFixed(2);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          angle={-45}
          textAnchor="end"
          height={80}
          tick={{ fontSize: 11 }}
          stroke="#6b7280"
          interval={0}
        />
        <YAxis 
          domain={yAxisDomain}
          tick={{ fontSize: 12 }}
          stroke="#6b7280"
          tickFormatter={(value) => valueFormatter ? valueFormatter(value) : value.toFixed(4)}
          scale="linear"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '12px'
          }}
          formatter={formatTooltipValue}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
        />
        
        {scenarios.map((scenario) => (
          <Line
            key={scenario}
            type="monotone"
            dataKey={scenario}
            stroke={SCENARIO_COLORS[scenario] || '#6b7280'}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name={scenario}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScenarioLineChart;