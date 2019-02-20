import React, { Component } from "react";
class SubComponent extends Component {
  render() {
    return <div className="subComponent">SubComponent</div>;
  }
}
class App extends Component {
  static defaultProps = {
    title: 'App'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }
  componentDidMount() {
    if (!document.head.querySelector('title')) {
      const title = document.createElement('title')
      title.innerText = this.props.title;
      document.head.appendChild(title);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      const title = document.head.querySelector('title')
      title.innerText = nextProps.title
    }
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
