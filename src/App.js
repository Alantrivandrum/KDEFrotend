import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kde_query_results: [],
    };
  }

  componentDidMount() {
    const url = "Placeholder for url of Graph DB API";
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ posts: json }));
  }

  render() {
    return <p>Hello world!</p>;
  }
}

export default App;
