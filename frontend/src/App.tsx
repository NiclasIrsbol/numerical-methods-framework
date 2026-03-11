import { useState } from "react"
import "./App.css"
import { TbMathFunction } from "react-icons/tb";
import Linechart from "./components/linecharts"

export default function App() {
  const [value, setValue] = useState('Heron\'s method');
  const [num, setNum] = useState(0);
  const [numiter, setNumIter] = useState(0);
  const [result, setResult] = useState(null)
  const [guesses, setGuesses] = useState([]);
  
  const handleChange = (e: any) => {
    setValue(e.target.value);
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
      params: {s: num, iter: numiter}
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
            </select>
          </div>
        </div>

        <div className="center-container">
          <h1 className="center-containerText">Visualizer</h1>
          <div className="center-container-graphs">
            <h2 className="center-container-graphsText">Algorithm: {value}</h2>
            <Linechart guesses={guesses}/>
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
            <div className="form-field">
              <label className="field-label" htmlFor="sqrt-number">Number</label>
              <input
                id="sqrt-number"
                type="number"
                min="1"
                placeholder="Number for square root"
                onChange={(e) => setNum(Number(e.target.value))}
              ></input>
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="iterations">Iterations</label>
              <input
                id="iterations"
                type="number"
                min="2"
                placeholder="Number of iterations"
                onChange={(e) => setNumIter(Number(e.target.value))}
              ></input>
            </div>

            <button className="runBtn" onClick={run}>Run</button>
          </div>
        </div>
      </div>
    </div>
  )
}

