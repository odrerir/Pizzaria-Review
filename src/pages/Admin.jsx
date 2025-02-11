import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    imagem: '',
    descricao: '',
    horarioFuncionamento: '',
    contato: '',
    pontosFortes: '',
    avaliacao: {
      massa: 0,
      recheio: 0,
      tempero: 0,
      preco: 0
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('avaliacao.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        avaliacao: {
          ...formData.avaliacao,
          [field]: Number(value)
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcula a média geral
    const valores = Object.values(formData.avaliacao);
    const mediaGeral = valores.reduce((a, b) => a + b, 0) / valores.length;

    const novaPizzaria = {
      ...formData,
      id: Date.now(), // ID temporário
      mediaGeral,
      pontosFortes: formData.pontosFortes.split(',').map(ponto => ponto.trim())
    };

    // Aqui você adicionaria a lógica para salvar no backend
    // Por enquanto, vamos salvar no localStorage
    const pizzariasAtuais = JSON.parse(localStorage.getItem('pizzarias') || '[]');
    localStorage.setItem('pizzarias', JSON.stringify([...pizzariasAtuais, novaPizzaria]));

    alert('Pizzaria adicionada com sucesso!');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adicionar Nova Pizzaria</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nome da Pizzaria</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">URL da Imagem</label>
          <input
            type="url"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Horário de Funcionamento</label>
          <input
            type="text"
            name="horarioFuncionamento"
            value={formData.horarioFuncionamento}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Contato</label>
          <input
            type="text"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Pontos Fortes (separados por vírgula)</label>
          <input
            type="text"
            name="pontosFortes"
            value={formData.pontosFortes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Ex: Massa fina, Forno a lenha, Delivery rápido"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Nota da Massa (0-5)</label>
            <input
              type="number"
              name="avaliacao.massa"
              value={formData.avaliacao.massa}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Nota do Recheio (0-5)</label>
            <input
              type="number"
              name="avaliacao.recheio"
              value={formData.avaliacao.recheio}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Nota do Tempero (0-5)</label>
            <input
              type="number"
              name="avaliacao.tempero"
              value={formData.avaliacao.tempero}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Nota do Preço (0-5)</label>
            <input
              type="number"
              name="avaliacao.preco"
              value={formData.avaliacao.preco}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Adicionar Pizzaria
        </button>
      </form>
    </div>
  );
}
