export const PizzariaService = {

  calcularMediaAvaliacoes(avaliacao) {
    // Verifica se a avaliação é um objeto válido
    if (!avaliacao || typeof avaliacao !== 'object') return 0;

    // Converte os valores para números e remove valores inválidos (NaN)
    const valores = Object.values(avaliacao).map(Number).filter(v => !isNaN(v));

    // Retorna 0 se não houver valores válidos para evitar divisão por zero
    if (valores.length === 0) return 0;

    // Calcula e retorna a média das avaliações
    return valores.reduce((a, b) => a + b, 0) / valores.length;
  },

  adicionarPizzaria(formData) {
    return new Promise((resolve) => {
      // Verifica se a estrutura de avaliação é válida
      if (!formData.avaliacao || typeof formData.avaliacao !== 'object') {
        return resolve({ error: 'Avaliação inválida' });
      }

      // Calcula a média das avaliações
      const mediaGeral = this.calcularMediaAvaliacoes(formData.avaliacao);

      // Cria o objeto da nova pizzaria com ID único e ajusta os pontos fortes
      const novaPizzaria = {
        ...formData,
        id: Date.now(), // Gera um ID único baseado no timestamp
        mediaGeral,
        pontosFortes: formData.pontosFortes
          ? formData.pontosFortes.split(',').map(ponto => ponto.trim())
          : []
      };

      try {
        // Obtém as pizzarias já salvas no localStorage
        const pizzariasAtuais = JSON.parse(localStorage.getItem('pizzarias') || '[]');

        // Adiciona a nova pizzaria e salva novamente no localStorage
        localStorage.setItem('pizzarias', JSON.stringify([...pizzariasAtuais, novaPizzaria]));

        // Retorna a pizzaria criada
        resolve(novaPizzaria);
      } catch (error) {
        // Retorna erro caso ocorra problema ao salvar os dados
        resolve({ error: 'Erro ao salvar no localStorage' });
      }
    });
  }
};
