import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import RatingBar from '../components/RatingBar';

export function Ranking() {
  const [pizzarias, setPizzarias] = useState([]);

  useEffect(() => {
    const loadedPizzarias = storageService.getPizzarias();
    // Ordena as pizzarias pela média geral em ordem decrescente
    const pizzariasOrdenadas = [...loadedPizzarias].sort((a, b) => b.mediaGeral - a.mediaGeral);
    setPizzarias(pizzariasOrdenadas);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ranking de Pizzarias</h1>
      <div className="space-y-4">
        {pizzarias.map((pizzaria, index) => (
          <div key={pizzaria.id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold w-12">{index + 1}º</span>
              <img
                src={pizzaria.imagem}
                alt={pizzaria.nome}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <Link
                  to={`/pizzaria/${pizzaria.id}`}
                  className="text-xl font-bold hover:text-blue-600"
                >
                  {pizzaria.nome}
                </Link>
                <div className="mt-2 space-y-1">
                  <RatingBar label="Massa" value={pizzaria.avaliacao.massa} />
                  <RatingBar label="Recheio" value={pizzaria.avaliacao.recheio} />
                  <RatingBar label="Tempero" value={pizzaria.avaliacao.tempero} />
                  <RatingBar label="Preço" value={pizzaria.avaliacao.preco} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {pizzaria.mediaGeral.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">Média Geral</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
