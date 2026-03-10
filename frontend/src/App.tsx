import { useState } from "react"
import "./App.css"

export default function App() {
  const [value, setValue] = useState('Heron\'s method');
  const [num, setNum] = useState(0);
  const [numiter, setNumIter] = useState(0);
  
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
  console.log(content);
  }

  return (
    <div>
      <h1>Select numerical algorithms</h1>
      <select value={value} onChange={handleChange}>
        <option value="Heron's method">Heron's method</option>
        <option value="Bakhshali method">Bakhshali method</option>
      </select>
      <h1>Choose params:</h1>
      <input type="number" placeholder="Number for square root" onChange={(e) => setNum(Number(e.target.value))}></input>
      <br></br>
      <input type="number" placeholder="Number of iterations" onChange={(e) => setNumIter(Number(e.target.value))}></input>
      <br></br>
      <button className="runBtn" onClick={run}>Run</button>
    </div>
  )
}

