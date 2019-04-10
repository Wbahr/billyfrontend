import React from "react"
import ReactDOM from "react-dom"
import MainScreen from "./screens/mainScreen"

const App = () => {
  return(
    <div>
      <h1>Hello!</h1>
      <MainScreen />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("index"));
