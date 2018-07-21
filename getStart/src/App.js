import React, { Component } from "react";
class SubComponent extends Component {
  render() {
    return <div className="subComponent">SubComponent</div>;
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }
  render() {
    return (
      <div className="App">
        <div className="result">{this.state.value}</div>
        <button
          onClick={() => {
            this.setState({
              value: this.state.value + 1
            });
          }}
        >
          +
        </button>
        <SubComponent />
      </div>
    );
  }
}

export default App;
