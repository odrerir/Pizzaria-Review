import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Admin } from './pages/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { storageService } from './services/storageService';
import {Home} from './pages/Home';

import './App.css';

storageService.initializeStorage();

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/ranking" className="navbar-link">Ranking</Link>
          <Link to="/admin" className="navbar-link">Adicionar Pizzaria</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzaria/:id" element={<PizzariaDetails />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
