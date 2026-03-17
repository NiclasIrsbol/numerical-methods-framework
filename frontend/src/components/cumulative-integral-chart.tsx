import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = {
  x: number;
  I: number;
};

type Props = {
  f: string;
  a: number;
  b: number;
  samples?: number;
};

function createEvaluator(expr: string) {
  const normalized = expr.replaceAll("^", "**");
  return (x: number) => {
    try {
      const result = Function("x", `return ${normalized}`)(x);
      const y = Number(result);
      return Number.isFinite(y) ? y : NaN;
    } catch {
      return NaN;
    }
  };
}

export default function CumulativeIntegralChart({ f, a, b, samples = 120 }: Props) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a === b || samples < 2) {
    return <p>Enter valid values for a, b, and n.</p>;
  }

  const totalWidth = b - a;
  const step = totalWidth / samples;
  const evalF = createEvaluator(f);

  const points: Point[] = [{ x: a, I: 0 }];
  let cumulative = 0;

  for (let i = 1; i <= samples; i++) {
    const xPrev = a + (i - 1) * step;
    const xCurr = a + i * step;
    const yPrev = evalF(xPrev);
    const yCurr = evalF(xCurr);

    if (!Number.isFinite(yPrev) || !Number.isFinite(yCurr)) {
      continue;
    }

    cumulative += ((yPrev + yCurr) * step) / 2;
    points.push({ x: xCurr, I: cumulative });
  }

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
            dataKey="I"
            domain={["auto", "auto"]}
            label={{ value: "Integral from a to x", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value) =>
              typeof value === "number" ? value.toFixed(6) : String(value ?? "")
            }
            labelFormatter={(label) =>
              typeof label === "number" ? `x = ${label.toFixed(6)}` : `x = ${String(label ?? "")}`
            }
          />
          <Line
            type="monotone"
            dataKey="I"
            name="Cumulative integral"
            stroke="#2a9d8f"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
