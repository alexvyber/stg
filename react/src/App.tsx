import { useState } from "react"
import "./App.css"

function App() {
  const [state, setState] = useState("")
  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="main">
        <input
          type="text"
          value={state}
          onChange={({ target }) => setState(target.value)}
        />
        <button>Click!</button>
      </div>
    </div>
  )
}

export default App
