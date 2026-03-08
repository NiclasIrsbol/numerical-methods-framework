import { useState } from "react"

export default function App() {
  const [text, setText] = useState('')
  const [value, setValue] = useState('Heron\'s method');

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
    body: JSON.stringify({algorithm: value})
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
      <button onClick={run}>Run</button>
    </div>
  )
}

