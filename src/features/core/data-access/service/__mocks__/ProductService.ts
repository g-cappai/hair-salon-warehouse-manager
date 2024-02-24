import { Product } from "@features/core/entity/Product.entity";

const mockProducts: Product[] = [
  {
    id: "1",
    barCode: "123456789",
    quantity: 10,
    brandId: "1",
    categoryId: "1",
    details: [
      {
        categoryDetailId: "1",
        value: "10",
      },
    ],
  },
  {
    id: "2",
    barCode: "987654321",
    quantity: 5,
    brandId: "2",
    categoryId: "2",
    details: [
      {
        categoryDetailId: "2",
        value: "5",
      },
    ],
  },
  {
    id: "3",
    barCode: "111111111",
    quantity: 1,
    brandId: "3",
    categoryId: "3",
    details: [
      {
        categoryDetailId: "3",
        value: "1",
      },
    ],
  },
  {
    id: "4",
    barCode: "222222222",
    quantity: 2,
    brandId: "4",
    categoryId: "4",
    details: [
      {
        categoryDetailId: "4",
        value: "2",
      },
    ],
  },
  {
    id: "5",
    barCode: "333333333",
    quantity: 3,
    brandId: "5",
    categoryId: "5",
    details: [
      {
        categoryDetailId: "5",
        value: "3",
      },
    ],
  },
  {
    id: "6",
    barCode: "444444444",
    quantity: 4,
    brandId: "6",
    categoryId: "6",
    details: [
      {
        categoryDetailId: "6",
        value: "4",
      },
    ],
  },
  {
    id: "7",
    barCode: "555555555",
    quantity: 5,
    brandId: "7",
    categoryId: "7",
    details: [
      {
        categoryDetailId: "7",
        value: "5",
      },
    ],
  },
  {
    id: "8",
    barCode: "666666666",
    quantity: 6,
    brandId: "8",
    categoryId: "8",
    details: [
      {
        categoryDetailId: "8",
        value: "6",
      },
    ],
  },
];

async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

async function getProductById(id: string): Promise<Product | null> {
  const product = mockProducts.find((p) => p.id === id);
  return product || null;
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  const product = mockProducts.find((p) => p.barCode === barCode);
  return product || null;
}

type InsertProductParams = Omit<Product, "id">;

async function createProduct(
  newProduct: InsertProductParams
): Promise<Product> {
  const product: Product = {
    id: String(mockProducts.length + 1),
    ...newProduct,
  };
  mockProducts.push(product);
  return product;
}

type UpdateProductParams = Omit<Partial<Product>, "barCode"> & {
  id: Product["id"];
};

async function updateProduct(
  updatedData: UpdateProductParams
): Promise<Product> {
  const productIndex = mockProducts.findIndex((p) => p.id === updatedData.id);
  if (productIndex === -1) {
    throw new Error("Product not found");
  }
  const updatedProduct = {
    ...mockProducts[productIndex],
    ...updatedData,
  };
  mockProducts[productIndex] = updatedProduct;
  return updatedProduct;
}

async function updateProductQuantity(
  id: string,
  newQuantity: number
): Promise<Product> {
  const productIndex = mockProducts.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    throw new Error("Product not found");
  }
  const updatedProduct = {
    ...mockProducts[productIndex],
    quantity: newQuantity,
  };
  mockProducts[productIndex] = updatedProduct;
  return updatedProduct;
}

async function deleteProductById(id: string): Promise<void> {
  const productIndex = mockProducts.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    throw new Error("Product not found");
  }
  mockProducts.splice(productIndex, 1);
}

export default {
  getProducts,
  getProductById,
  getProductByBarCode,
  createProduct,
  updateProduct,
  updateProductQuantity,
  deleteProductById,
};
