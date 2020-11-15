import React, { Component } from "react";
//import Main from "./pages/main";
import "./style.css";
import Header from "./components/Header";
import Routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h6>by Doug Caval™</h6>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default App;

//by Doug Caval
