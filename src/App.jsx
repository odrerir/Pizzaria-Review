import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { storageService } from './services/storageService';

import { PizzariaDetails } from './pages/PizzariaDetails';
import { Ranking } from './pages/Ranking';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { Admin } from './pages/Admin';

import './Global.css';

export function App() {
  // Inicializa o localStorage com dados mockados
  useEffect(() => {
    storageService.initializeStorage();
  }, []);

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzaria/:id" element={<PizzariaDetails />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
