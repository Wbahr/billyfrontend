import React from "react";
import ReactDOM from "react-dom";
// import Screen from "./screens/mainScreen"
// import DatePicker from "react-datepicker"

const App = () => {
  return(
    <div>
      <h1>Hello!</h1>
      {/* <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
      />
      <DatePicker
        selected={this.state.endDate}
        onChange={this.handleChange}
      /> */}
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("index"));