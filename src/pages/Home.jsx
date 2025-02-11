import { useState, useEffect } from 'react';
import PizzariaCard from '../components/PizzariaCard';
import { storageService } from '../services/storageService';

export function Home() {
  const [pizzarias, setPizzarias] = useState([]);

  useEffect(() => {
    // Carrega as pizzarias do localStorage
    const loadedPizzarias = storageService.getPizzarias();
    setPizzarias(loadedPizzarias);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pizzarias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzarias.map(pizzaria => (
          <PizzariaCard key={pizzaria.id} pizzaria={pizzaria} />
        ))}
      </div>
    </div>
  );
}
