import React, { useEffect, useState, Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Dashboard from './pages/dashboard';
import APIManager from './pages/apiManager';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact elements={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/apiManager' element={<APIManager />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;