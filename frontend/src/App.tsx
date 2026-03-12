import { useState } from "react"
import "./App.css"
import { TbMathFunction } from "react-icons/tb";
import Linechart from "./components/linecharts"

type AlgorithmName = "Heron's method" | "Bakhshali method" | "Bisection method";

type ParamDef = {
  key: string;
  label: string;
  type: "number" | "text";
  min?: number;
  placeholder?: string;
  defaultValue?: number | string;
};

const paramDefs: Record<AlgorithmName, ParamDef[]> = {
  "Heron's method": [
    { key: "s", label: "Number", type: "number", min: 1, placeholder: "Number for square root", defaultValue: 2 },
    { key: "iter", label: "Iterations", type: "number", min: 2, placeholder: "Number of iterations", defaultValue: 10 },
  ],
  "Bakhshali method": [
    { key: "s", label: "Number", type: "number", min: 1, placeholder: "Number for square root", defaultValue: 2 },
    { key: "iter", label: "Iterations", type: "number", min: 2, placeholder: "Number of iterations", defaultValue: 10 },
  ],
  "Bisection method": [
    {key: "f", label: "f(x)", type: "text", placeholder: "Enter function", defaultValue: "x^2"},
    {key: "a", label: "Lower bound (a)", type: "number", placeholder: "Enter lower bound", defaultValue: 1},
    {key: "b", label: "Upper bound (b)", type: "number", placeholder: "Enter upper bound", defaultValue: 5},
  ],
};

export default function App() {
  const [result, setResult] = useState(null)
  const [guesses, setGuesses] = useState([]);
  const [value, setValue] = useState<AlgorithmName>("Heron's method");
  const [paramValues, setParamValues] = useState<Record<string, number | string>>({ s: 0, iter: 0 });
  const showChart = value === "Heron's method" || value === "Bakhshali method";
  
  const handleChange = (e: any) => {
    const nextAlg = e.target.value as AlgorithmName;
    setValue(nextAlg);

    const defaults: Record<string, number | string> = {};
    for (const def of paramDefs[nextAlg]) defaults[def.key];
    setParamValues(defaults);
    setGuesses([]);
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
  const g = content.guesses;
  setResult(content.Metrics);
  setGuesses(g);
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
            </select>
          </div>
        </div>

        <div className="center-container">
          <h1 className="center-containerText">Visualizer</h1>
          <div className="center-container-graphs">
            <h2 className="center-container-graphsText">Algorithm: {value}</h2>
            {showChart && <Linechart guesses={guesses} />}
          </div>
          <div className="center-container-result">
            <pre className="result-code">{JSON.stringify(result, null, 2)}</pre>
          </div>
          <div className="center-container-metrics">
            <h1>Hejsa</h1>
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
                  placeholder={def.placeholder}
                  value={paramValues[def.key] ?? ""}
                  onChange={(e) =>
                    setParamValues((prev) => ({
                      ...prev,
                      [def.key]: e.target.value,
                    }))
                  }
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

