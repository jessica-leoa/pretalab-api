// tests/unit/services/productsService.spec.ts
import { getAllProducts, getProductById } from "../../../src/services/productsService";
import { products } from "../../../src/data/productsData";

jest.mock("../../../src/data/productsData", () => ({
  products: [
    { id: 1, name: "Test Product 1", price: 100 },
    { id: 2, name: "Test Product 2", price: 200 }
  ]
}));

describe("Products Service", () => {
  it("should return all products", () => {
    const result = getAllProducts();
    
    expect(result).toHaveLength(2);
    expect(result).toMatchObject([
      expect.objectContaining({ id: 1, price: 100 }),
      expect.objectContaining({ id: 2, price: 200 })
    ]);
  });

  it("should return product by id", () => {
    const result = getProductById(1);
    
    expect(result).toMatchObject({
      id: 1,
      name: "Test Product 1",
      price: 100
    });
  });

  it("should return undefined for non-existent id", () => {
    const result = getProductById(999);
    expect(result).toBeUndefined();
  });
});