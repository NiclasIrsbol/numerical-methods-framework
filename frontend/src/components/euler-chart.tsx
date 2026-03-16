import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EulerPoint = {
  x: number;
  y: number;
};

type Props = {
  points: EulerPoint[];
};

export default function EulerChart({ points }: Props) {
  return (
    <div style={{ width: "100%", height: 360, padding: "8px 4px 0" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(96, 150, 186, 0.25)" />
          <XAxis
            type="number"
            dataKey="x"
            domain={["dataMin", "dataMax"]}
            label={{ value: "x", position: "insideBottom", offset: -4 }}
          />
          <YAxis
            dataKey="y"
            domain={["auto", "auto"]}
            label={{ value: "y", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(plotValue) =>
              typeof plotValue === "number" ? plotValue.toFixed(6) : String(plotValue ?? "")
            }
            labelFormatter={(label) =>
              typeof label === "number" ? `x = ${label.toFixed(6)}` : `x = ${String(label ?? "")}`
            }
          />
          <Legend />
          <Line
            type="linear"
            dataKey="y"
            name="Euler approximation"
            stroke="#6096BA"
            strokeWidth={3}
            dot={{ r: 4, fill: "#274C77" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}