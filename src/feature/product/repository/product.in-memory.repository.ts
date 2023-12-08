import { Product } from "../entity/Product.entity";

type ProductModel = {
  id: string;
  barCode: string;
  name: string;
  quantity: number;
};

const products = new Map<string, ProductModel>();

// -----------------------------------------------------------------------------

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = Array.from(
    products.values()
  ).find((p) => p.barCode === barCode);

  if (!dbProduct) {
    return null;
  }

  return {
    id: barCode,
    barCode: dbProduct.barCode,
    name: dbProduct.name,
    quantity: dbProduct.quantity,
  };
}

async function insertProduct({
  barCode,
  name,
  quantity,
}: Omit<Product, "id">): Promise<Product> {
  const dbProduct: ProductModel = { id: barCode, barCode, name, quantity };

  if (products.has(barCode)) {
    throw new RepositoryError(ServiceErrorStatus.EXISTING_PRODUCT);
  }

  products.set(barCode, dbProduct);

  return { id: barCode, barCode, name, quantity };
}

async function updateProductQuantity(
  id: string,
  newQuantity: number
): Promise<Product> {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  const updatedProduct: ProductModel = {
    id: dbProduct.id,
    barCode: dbProduct.barCode,
    name: dbProduct.name,
    quantity: newQuantity,
  };

  products.set(dbProduct.id, updatedProduct);

  return {
    id: dbProduct.barCode,
    barCode: dbProduct.barCode,
    name: dbProduct.name,
    quantity: newQuantity,
  };
}

function deleteProduct(id: string): void {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  products.delete(id);
}

export const productRepository = {
  getProductByBarCode,
  insertProduct,
  updateProductQuantity,
};

// -----------------------------------------------------

export class RepositoryError extends Error {
  status: ServiceErrorStatus;

  constructor(status: ServiceErrorStatus) {
    super(status);
    this.status = status;
  }
}

export enum ServiceErrorStatus {
  EXISTING_PRODUCT = "EXISTING_PRODUCT",
  PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
}
