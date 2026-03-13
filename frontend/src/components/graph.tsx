import { Mafs, Coordinates, Plot, Point } from "mafs"

type Props = {
  func?: string;
  x1?: number;
  y1?: number
};

export default function Graph({ func, x1, y1 }: Props) {
  const normalized = func?.replaceAll("^", "**");

  const evaluateY = (x: number) => {
    try {
      const result = Function("x", `return ${normalized}`)(x);
      const y = Number(result);
      return Number.isFinite(y) ? y : NaN;
    } catch {
      return NaN;
    }
  };

  return (
    <Mafs>
      <Coordinates.Cartesian subdivisions={4} />
      <Plot.OfX y={(x) => evaluateY(x)} />
      <Point x={x1 ?? 0} y={y1 ?? 0} />
    </Mafs>
  )
}

