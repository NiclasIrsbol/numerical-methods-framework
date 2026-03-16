import { useState } from "react"
import "./App.css"
import { TbMathFunction } from "react-icons/tb";
import Linechart from "./components/linecharts"
import Graph from "./components/graph"
import EulerChart from "./components/euler-chart";

type AlgorithmName = "Heron's method" | "Bakhshali method" | "Bisection method" | "Newton Rhapson method" | "Secant method" | "Inverse method" | "Eulers method";

type ParamDef = {
  key: string;
  label: string;
  type: "number" | "text";
  min?: number;
  max?: number;
  placeholder?: string;
  defaultValue?: number | string;
};

const paramDefs: Record<AlgorithmName, ParamDef[]> = {
  "Heron's method": [
    { key: "s", label: "Number", type: "number", min: 1, placeholder: "Number for square root", defaultValue: 2 },
    { key: "iter", label: "Iterations", type: "number", min: 2, max: 250, placeholder: "Number of iterations", defaultValue: 10 },
  ],
  "Bakhshali method": [
    { key: "s", label: "Number", type: "number", min: 1, placeholder: "Number for square root", defaultValue: 2 },
    { key: "iter", label: "Iterations", type: "number", min: 2, max: 250, placeholder: "Number of iterations", defaultValue: 10 },
  ],
  "Bisection method": [
    {key: "f", label: "f(x)", type: "text", placeholder: "Enter function", defaultValue: "x^2"},
    {key: "a", label: "Lower bound (a)", type: "number", placeholder: "Enter lower bound", defaultValue: 1},
    {key: "b", label: "Upper bound (b)", type: "number", placeholder: "Enter upper bound", defaultValue: 5},
  ],
  "Newton Rhapson method": [
    {key: "f", label: "f(x)", type: "text", placeholder: "Enter function", defaultValue: "x^2"},
    {key: "iter", label: "Iterations", type: "number", min: 2, max: 250, placeholder: "Number of iterations", defaultValue: 10 },
    {key: "x_0", label: "Intial guess (x_0)", type: "number", placeholder: "Enter x_0", defaultValue: "2"},
  ],
  "Secant method": [
    {key: "f", label: "f(x)", type: "text", placeholder: "Enter function", defaultValue: "x^2"},
    {key: "iter", label: "Iterations", type: "number", min: 2, max: 250, placeholder: "Number of iterations", defaultValue: 10 },
    {key: "x_0", label: "Intial guess (x0)", type: "number", placeholder: "Enter x0", defaultValue: "2"},
    {key: "x_1", label: "Intial guess (x1)", type: "number", placeholder: "Enter x1", defaultValue: "10"},
  ],

  "Inverse method": [
    {key: "A", label: "Matrix (A)", type: "text", placeholder: "Enter matrix of systems of linear equations (left side)", defaultValue: "[2x+3y;5x+1y]"},
    {key: "B", label: "Matrix (B)", type: "text", placeholder: "Enter matrix of systems of linear equations (right side)", defaultValue: "[50;40]"},
  ],

  "Eulers method": [
    {key: "f", label: "f(x)", type: "text", placeholder: "Enter function", defaultValue: "2*x"},
    {key: "x0", label: "x0", type: "number", placeholder: "Enter value of x0", defaultValue: 1},
    {key: "y0", label: "y0", type: "number", placeholder: "Enter value of y0", defaultValue: 1},
    {key: "yx", label: "y(x)", type: "number", placeholder: "Enter value you want to approximate", defaultValue: 1.5},
    {key: "h", label: "h", type: "number", placeholder: "Enter step-size h", defaultValue: 0.02},
  ],

};

export default function App() {
  const [result, setResult] = useState(null)
  const [guesses, setGuesses] = useState([]);
  const [eulerPoints, setEulerPoints] = useState<{ x: number; y: number }[]>([]);
  const [value, setValue] = useState<AlgorithmName>("Heron's method");
  const [paramValues, setParamValues] = useState<Record<string, number | string>>({ s: 0, iter: 0 });
  const showChart = value === "Heron's method" || value === "Bakhshali method";
  const showGraph = value === "Bisection method" || value === "Newton Rhapson method" || value === "Secant method";
  const showEulerChart = value === "Eulers method";
  const noVisualization = value === "Inverse method";
  const [root, setRoot] = useState(0);
  
  const handleChange = (e: any) => {
    const nextAlg = e.target.value as AlgorithmName;
    setValue(nextAlg);

    const defaults: Record<string, number | string> = {};
    for (const def of paramDefs[nextAlg]) defaults[def.key] = def.defaultValue ?? "";
    setParamValues(defaults);
    setGuesses([]);
    setEulerPoints([]);
    setRoot(0)
  };

  async function run() {
  const rawResponse = await fetch('http://localhost:8000/run', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      algorithm: value,
      params: paramValues
    })
  });
  const content = await rawResponse.json();
  const g = Array.isArray(content.guesses)
    ? content.guesses
    : Array.isArray(content.approximations)
      ? content.approximations
      : [];
  const points = Array.isArray(content.points) ? content.points : [];
  setResult(content);
  setGuesses(g);
  setEulerPoints(points);
  setRoot((content.Metrics?.["approx-value "] ?? 0))
  }

  return (
    <div className="screen">
      <nav className="navigation-menu">
        <h2 className="nav-text"><TbMathFunction className="icon" /> Numerical Analysis framework</h2>
      </nav>
      <div className="content-row">
        <div className="left-container">
          <div className="left-containerText">
            <h2 className="left-containerHeader">Select numerical algorithm</h2>
            <select value={value} onChange={handleChange}>
              <option value="Heron's method">Heron's method</option>
              <option value="Bakhshali method">Bakhshali method</option>
              <option value="Bisection method">Bisection method</option>
              <option value="Newton Rhapson method">Newton Rhapson method</option>
              <option value="Secant method">Secant method</option>
              <option value="Inverse method">Inverse method</option>
              <option value="Eulers method">Euler's method</option>
            </select>
          </div>
        </div>

        <div className="center-container">
          <h1 className="center-containerText">Visualizer</h1>
          <div className="center-container-graphs">
            <h2 className="center-container-graphsText">Algorithm: {value}</h2>
            {showChart && <Linechart guesses={guesses} />}
            {showGraph && <Graph func={String(paramValues.f)} x1={root} y1={0}></Graph>}
            {showEulerChart && <EulerChart points={eulerPoints} />}
            {noVisualization && <h1 className="novis-text">No visualization to show for this algorithm</h1>}
          </div>
          <div className="center-container-result">
            <pre className="result-code">{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>

        <div className="right-container">
          <div className="right-containerText">
            <h2 className="right-containerHeader">Choose params:</h2>
            {paramDefs[value].map((def) => (
              <div className="form-field" key={def.key}>
                <label className="field-label">{def.label}</label>
                <input
                  type={def.type}
                  min={def.min}
                  max={def.max}
                  placeholder={def.placeholder}
                  value={paramValues[def.key] ?? ""}
                  onChange={(e) => {
                    const raw = e.target.value;

                    setParamValues((prev) => {
                      if (def.key === "iter" && def.type === "number") {
                        const n = e.target.valueAsNumber;
                        const min = def.min ?? 2;
                        const max = def.max ?? 250;
                        const clamped = Math.min(max, Math.max(min, n));
                        return { ...prev, [def.key]: clamped };
                      }
                      return { ...prev, [def.key]: raw };
                    });
                  }}
                />
              </div>
            ))}
            <button className="runBtn" onClick={run}>Run</button>
          </div>
        </div>
      </div>
    </div>
  )
}

