// tests/integration/setup.js
const { transactions } = require('../../src/data');

// Limpa e popula dados de teste antes de CADA teste
beforeEach(() => {
  // Limpa o array
  transactions.length = 0;
  
  // Adiciona dados de teste consistentes
  transactions.push(
    {
      id: "test-1",
      date: "2024-01-01T00:00:00Z",
      description: "Salário Teste",
      amount: 1000,
      type: "income",
      category: "Salário"
    },
    {
      id: "test-2", 
      date: "2024-01-02T00:00:00Z",
      description: "Aluguel Teste",
      amount: 500,
      type: "expense",
      category: "Moradia"
    }
  );
});

// Opcional: limpar depois de todos os testes
afterAll(() => {
  transactions.length = 0;
});