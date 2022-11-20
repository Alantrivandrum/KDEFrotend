import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

let query_dict = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kde_query_results: [],
    };
  }

  componentDidMount(query_dict) {
    let settings = { headers: { Accept: "application/sparql-results+json" } };
    for (let i = 1; i < 10; i++) {
      let query = "query_" + i;
      const url = `http://localhost:7200/repositories/Test?query=${query_dict[query]}`;
      fetch(url, settings)
        .then((response) => response.json())
        .then((json) => this.setState({ Kde_query_results: json }));
    }
  }

  render() {
    return (
      <div>
        <h1> Knowledge Graph</h1>
        <span>{this.state.kde_query_results}</span>
        <button>Query1</button>
        <button>Query2</button>
        <button>Query3</button>
        <button>Query4</button>
        <button>Query5</button>
        <button>Query6</button>
        <button>Query7</button>
        <button>Query8</button>
        <button>Query9</button>
        <button>Query10</button>
      </div>
    );
  }
}

export default App;
