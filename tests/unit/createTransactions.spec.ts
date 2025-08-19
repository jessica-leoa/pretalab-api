import { createTransaction, getAllTransactions } from "../../src/services/transactionsService";
import { transactions } from "../../src/data";

// Mock do data para isolamento completo
jest.mock("../../src/data", () => ({
  transactions: []
}));

describe("createTransaction", () => {
  beforeEach(() => {
    transactions.length = 0;
  });

  it("should create a new transaction and add to the array", () => {
    const newTransaction = {
      id: "1",
      date: "2024-01-01T00:00:00Z",
      description: "Compra no supermercado",
      amount: 100,
      type: "expense" as const,
      category: "Uncategorized"
    };

    const createdTransaction = createTransaction(newTransaction);
    // Verifica se a transação foi criada corretamente
    expect(createdTransaction).toEqual(newTransaction);
    
    // verifica se a transação foi adicionada ao array
    expect(transactions).toHaveLength(1);
    expect(transactions[0]).toEqual(newTransaction);
  });

  it("should handle multiple transactions", () => {
    const transaction1 = {
      id: "1",
      date: "2024-01-01T00:00:00Z",
      description: "Transação 1",
      amount: 100,
      type: "income" as const,
      category: "Category 1"
    };

    const transaction2 = {
      id: "2",
      date: "2024-01-02T00:00:00Z",
      description: "Transação 2",
      amount: 50,
      type: "expense" as const,
      category: "Category 2"
    };

    createTransaction(transaction1);
    createTransaction(transaction2);

    expect(transactions).toHaveLength(2);
    expect(transactions[0].id).toBe("1");
    expect(transactions[1].id).toBe("2");
  });

  it("should return the same transaction that was passed", () => {
    const transaction = {
      id: "test-id",
      date: "2024-01-01T00:00:00Z",
      description: "Test Transaction",
      amount: 75.5,
      type: "income" as const,
      category: "Test"
    };

    const result = createTransaction(transaction);

    expect(result).toBe(transaction); // Deve ser a mesma referência
  });
});