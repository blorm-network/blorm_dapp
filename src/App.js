// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Transfer from './pages/Transfer';
import Blint from './pages/Blint';
import Blap from './pages/Blap';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/blint" element={<Blint />} />
        <Route path="/blap" element={<Blap />} />
      </Routes>
    </Router>
  );
}

export default App;