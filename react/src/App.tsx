import "./App.css"

import { Auth } from "./compoents/auth"
import { InputField } from "./compoents/input-field"
import { RealTimeField } from "./compoents/real-time"

function App() {
  return (
    <div className="App">
      <div className="main">
        <InputField />
      </div>

      <br />
      <hr />
      <br />

      <div className="main">
        <RealTimeField />
      </div>

      <br />
      <hr />
      <br />

      <div style={{ marginTop: "100px" }}>
        <Auth />
      </div>
    </div>
  )
}

export default App
