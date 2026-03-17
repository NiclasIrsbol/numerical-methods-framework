import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  values: number[];
};

export default function InverseChart({ values }: Props) {
  if (!values.length) {
    return <p>No solution vector available yet.</p>;
  }

  const data = values.map((value, index) => ({
    variable: `x${index + 1}`,
    value,
  }));

  return (
    <div style={{ width: "100%", height: 360, padding: "8px 4px 0" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(96, 150, 186, 0.25)" />
          <XAxis
            dataKey="variable"
            label={{ value: "Variable", position: "insideBottom", offset: -4 }}
          />
          <YAxis
            dataKey="value"
            domain={["auto", "auto"]}
            label={{ value: "Value", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(val) => (typeof val === "number" ? val.toFixed(6) : String(val ?? ""))}
          />
          <Bar dataKey="value" name="Solution" fill="#2a9d8f" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
