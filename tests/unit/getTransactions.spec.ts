import { getTransactionsById, getAllTransactions } from "../../src/services/transactionsService";
import { transactions } from "../../src/data";

jest.mock("../../src/data", () => ({
  transactions: []
}));

describe("Transactions Service", () => {
  beforeEach(() => {
    transactions.length = 0;
    
    // Dados de teste
    transactions.push(
      {
        id: "1",
        date: "2024-01-01T00:00:00Z",
        description: "Salário",
        amount: 1000,
        type: "income",
        category: "Salário"
      },
      {
        id: "2",
        date: "2024-01-02T00:00:00Z",
        description: "Aluguel",
        amount: 500,
        type: "expense",
        category: "Moradia"
      }
    );
  });

  describe("getTransactionsById", () => {
    it("should return a transaction if it exists", () => {
      const transaction = getTransactionsById("1");
      
      expect(transaction).toBeDefined();
      expect(transaction?.id).toBe("1");
      expect(transaction?.description).toBe("Salário");
    });

    it("should return undefined if the transaction does not exist", () => {
      const transaction = getTransactionsById("non-existent-id");
      expect(transaction).toBeUndefined();
    });

    it("should return undefined for empty id", () => {
      const transaction = getTransactionsById("");
      expect(transaction).toBeUndefined();
    });

    it("should return undefined for null id", () => {
      const transaction = getTransactionsById(null as any);
      expect(transaction).toBeUndefined();
    });
  });

  describe("getAllTransactions", () => {
    it("should return all transactions", () => {
      const allTransactions = getAllTransactions();
      
      expect(allTransactions).toHaveLength(2);
      expect(allTransactions[0].id).toBe("1");
      expect(allTransactions[1].id).toBe("2");
    });

    it("should return empty array when no transactions", () => {
      transactions.length = 0; 
      
      const allTransactions = getAllTransactions();
      expect(allTransactions).toEqual([]);
    });
  });
});