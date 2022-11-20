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

  // componentDidMount(query_dict) {
  //   let settings = { headers: { Accept: "application/sparql-results+json" } };
  //   for (let i = 1; i < 10; i++) {
  //     let query = "query_" + i;
  //     const url = `http://localhost:7200/repositories/Test?query=${query_dict[query]}`;
  //     fetch(url, settings)
  //       .then((response) => response.json())
  //       .then((json) => this.setState({ Kde_query_results: json }));
  //   }
  // }


  render() {
    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
      <div>
        <h1> Knowledge Graph</h1>
        <span>{this.state.kde_query_results}</span>
        <button onClick={() => openInNewTab('/query1')}>
          Query1
        </button>
        <button onClick={() => openInNewTab('/query2')} >
          Query2
        </button>
        <button onClick={() => openInNewTab('/query3')} >
          Query3
        </button>
        <button onClick={() => openInNewTab('/query4')} >
          Query4
        </button>
        <button onClick={() => openInNewTab('/query5')} >
          Query5
        </button>
        <button onClick={() => openInNewTab('/query6')} >
          Query6
        </button>
        <button onClick={() => openInNewTab('/query7')} >
          Query7
        </button>
        <button onClick={() => openInNewTab('/query8')} >
          Query8
        </button>
        <button onClick={() => openInNewTab('/query9')} >
          Query9
        </button>
        <button onClick={() => openInNewTab('/query10')} >
          Query10
        </button>
      </div>
    );
  }
}

export default App;
