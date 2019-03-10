import React, { Component } from "react";

// SimpleApp.js
class SubComponent extends Component {
  render() {
    return <div className="subComponent">SubComponent</div>;
  }
}
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App2">
        <div className="result">{this.props.value}</div>
        <SubComponent />
      </div>
    );
  }
}
export default App;
