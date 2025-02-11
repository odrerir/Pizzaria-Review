import { initialPizzarias } from '../data/InitialData';

const STORAGE_KEY = 'pizzarias';

export const storageService = {
  // Inicializa o localStorage com dados mockados se estiver vazio
  initializeStorage: () => {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPizzarias));
    }
  },

  // Obtém todas as pizzarias
  getPizzarias: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data || '[]');
  },

  // Obtém uma pizzaria específica por ID
  getPizzariaById: (id) => {
    const pizzarias = storageService.getPizzarias();
    return pizzarias.find(p => p.id === Number(id));
  },

  // Adiciona uma nova pizzaria
  addPizzaria: (pizzaria) => {
    const pizzarias = storageService.getPizzarias();
    const newPizzaria = {
      ...pizzaria,
      id: Date.now(), // Gera um ID único baseado no timestamp
    };
    pizzarias.push(newPizzaria);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pizzarias));
    return newPizzaria;
  },

  // Atualiza uma pizzaria existente
  updatePizzaria: (id, updatedData) => {
    const pizzarias = storageService.getPizzarias();
    const index = pizzarias.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      pizzarias[index] = { ...pizzarias[index], ...updatedData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pizzarias));
      return pizzarias[index];
    }
    return null;
  },

  // Remove uma pizzaria
  deletePizzaria: (id) => {
    const pizzarias = storageService.getPizzarias();
    const filteredPizzarias = pizzarias.filter(p => p.id !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPizzarias));
  }
};