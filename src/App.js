import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import PizzariaDetails from './pages/PizzariaDetails';
import Ranking from './pages/Ranking';
import Admin from './pages/Admin';
import { storageService } from './services/storageService';

export function App() {
  useEffect(() => {
    // Inicializa o localStorage com dados mockados se necessário
    storageService.initializeStorage();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizzaria/:id" element={<PizzariaDetails />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
