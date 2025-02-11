import { useState } from 'react'
import './App.css'

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/ranking">Ranking</Link>
          <Link to="/admin">Adicionar Pizzaria</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzaria/:id" element={<PizzariaDetails />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
