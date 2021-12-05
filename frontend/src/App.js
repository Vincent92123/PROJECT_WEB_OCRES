import React, { useEffect, useState, Component } from 'react';
import './App.css';
/*import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Dashboard from './pages/dashboard';
import APIManager from './pages/apiManager';*/
import Dashboard from './Dashboard';
import APIManager from './APIManager';
import { Route, Link, Routes, Router } from "react-router-dom"
import NavBar from "./NavBar";

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/apiManager' element={<APIManager />} />
          </Routes>
        </Router>
      </div>
    );
  }
}*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navigation">
          <NavBar />
        </div>
        <div>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/apiManager' element={<APIManager />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;