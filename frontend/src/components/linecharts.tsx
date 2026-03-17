import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  guesses: number[];
};

export default function Linechart({ guesses }: Props) {
  const data = guesses.map((guess, index) => ({
    iteration: index + 1,
    guess,
  }));

  return (
    <div style={{ width: "80%", height: 300, margin: 50}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="iteration" />
          <YAxis   tickFormatter={(value) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value)
  }/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="guess" name="Cumulative integral"
            stroke="#2a9d8f"
            strokeWidth={3}
            dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}