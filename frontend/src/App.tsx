import { useState } from "react"

export default function App() {
  const [text, setText] = useState('')

  async function fetchData() {
    const response = await fetch('http://localhost:8000/')
    if (response.ok) {
    const data = await response.json()
    console.log(data)
    setText(data)
    }
  }

  return (
    <div>
      <h1>Press button</h1>
      <button onClick={fetchData}>Press me</button>
      <h1>{text}</h1>
    </div>
  )
}

