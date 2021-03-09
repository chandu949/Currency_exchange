import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Link} from "react-router-dom";

import CurrencyExchange from "./components/CurrencyExchange";
import Dashboard from "./components/Dashboard";

function App() {
  return (  
    <Router>
      <div className="app-container">
        <div className="bg-dark">
          <nav className="nabvar navbar-expand-md navbar-dark bg-dark fixed-top pt-3 pb-3">
        <ul className="removebullets">
          <li>
            <Link to="/dashboard" className="moveleft">
                  Dashboard
            </Link>
          </li>
          <li>
            <Link to="/currencyexchange" className="moveright">
              Currency Exchange
            </Link>
          </li>
        </ul>
        </nav>
        </div>
        <div className="dashboard-container">
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/currencyexchange" component={CurrencyExchange}></Route>
        </div>
      </div>
    </Router>
  );
}

export default App;