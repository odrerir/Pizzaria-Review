import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import RatingBar from '../components/RatingBar';

export function PizzariaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizzaria, setPizzaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const found = storageService.getPizzariaById(Number(id));
      if (found) {
        setPizzaria(found);
      } else {
        setError('Pizzaria não encontrada');
      }
    } catch (err) {
      setError('Erro ao carregar os dados da pizzaria');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center text-red-600">
          <p className="text-xl font-bold mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Voltar
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={pizzaria.imagem}
          alt={pizzaria.nome}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{pizzaria.nome}</h1>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {pizzaria.mediaGeral.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">Média Geral</div>
            </div>
          </div>

          <p className="text-gray-600 mt-2">{pizzaria.endereco}</p>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Avaliações</h2>
              <div className="space-y-4">
                <RatingBar label="Massa" value={pizzaria.avaliacao.massa} />
                <RatingBar label="Recheio" value={pizzaria.avaliacao.recheio} />
                <RatingBar label="Tempero" value={pizzaria.avaliacao.tempero} />
                <RatingBar label="Preço" value={pizzaria.avaliacao.preco} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Informações</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700">Descrição</h3>
                  <p className="text-gray-600">{pizzaria.descricao}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Horário de Funcionamento</h3>
                  <p className="text-gray-600">{pizzaria.horarioFuncionamento}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Contato</h3>
                  <p className="text-gray-600">{pizzaria.contato}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Pontos Fortes</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {pizzaria.pontosFortes.map((ponto, index) => (
                      <li key={index}>{ponto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
