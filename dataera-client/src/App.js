import React, { Component } from 'react';
import logo from './img/horn.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Let's learn IT together!
          </p>
          <a
            className="App-link"
            href="https://github.com/georgezhang/dataera"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
        </header>
      </div>
    );
  }
}

export default App;
