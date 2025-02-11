import { Link } from 'react-router-dom';


export function PizzariaCard({ pizzaria }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <img src={pizzaria.imagem} alt={pizzaria.nome} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{pizzaria.nome}</h2>
      <div className="flex items-center mt-2">
        <span className="text-2xl font-bold">{pizzaria.mediaGeral.toFixed(1)}</span>
        <span className="text-gray-500 ml-2">/ 5.0</span>
      </div>
      <Link to={`/pizzaria/${pizzaria.id}`} className="mt-2 block text-blue-600">
        Ver detalhes →
      </Link>
    </div>
  );
}