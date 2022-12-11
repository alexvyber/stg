import "./App.css"

import { Auth } from "./compoents/auth"
import { InputField } from "./compoents/input-field"

function App() {
  return (
    <div className="App">
      <div className="main">
        <InputField />
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
