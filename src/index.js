import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <Switch>
      <Route exact path='/'>
        <App/>
      </Route>
      <Route path='/query1'>
        <Query1/>
      </Route>
      <Route path='/query2'>
        <Query2/>
      </Route>
      <Route path='/query3'>
        <Query3/>
      </Route>
      <Route path='/query4'>
        <Query4/>
      </Route>
      <Route path='/query5'>
        <Query5/>
      </Route>
      <Route path='/query6'>
        <Query6/>
      </Route>
      <Route path='/query7'>
        <Query7/>
      </Route>
      <Route path='/query8'>
        <Query8/>
      </Route>
      <Route path='/query9'>
        <Query9/>
      </Route>
      <Route path='/query10'>
        <Query10/>
      </Route>
    </Switch> 
  </Router>
);


function Query1() {
  return (
    <div>
      <h2>Query1</h2>
      <textarea id="w3review" name="w3review" rows="4" cols="50">
       
      </textarea>
    </div>
  );
}

function Query2() {
  return (
    <div>
      <h2>Query2</h2>
    </div>
  );
}

function Query3() {
  return (
    <div>
      <h2>Query3</h2>
    </div>
  );
}
function Query4() {
  return (
    <div>
      <h2>Query4</h2>
    </div>
  );
}
function Query5() {
  return (
    <div>
      <h2>Query5</h2>
    </div>
  );
}
function Query6() {
  return (
    <div>
      <h2>Query6</h2>
    </div>
  );
}
function Query7() {
  return (
    <div>
      <h2>Query7</h2>
    </div>
  );
}
function Query8() {
  return (
    <div>
      <h2>Query8</h2>
    </div>
  );
}
function Query9() {
  return (
    <div>
      <h2>Query9</h2>
    </div>
  );
}
function Query10() {
  return (
    <div>
      <h2>Query10</h2>
    </div>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
