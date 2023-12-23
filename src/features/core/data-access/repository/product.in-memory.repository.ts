import { Product } from "../../entity/Product.entity";

type ProductModel = Product;

const products = new Map<string, ProductModel>();

// -----------------------------------------------------------------------------

async function _simulateDelay<T>(val: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(val), 2000));
}

async function getProductById(id: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    return _simulateDelay(null);
  }

  return _simulateDelay(dbProduct);
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = Array.from(
    products.values()
  ).find((p) => p.barCode === barCode);

  if (!dbProduct) {
    return _simulateDelay(null);
  }

  return _simulateDelay(dbProduct);
}

async function getProducts(): Promise<Product[]> {
  return Array.from(products.values());
}

async function insertProduct(
  newProduct: Omit<Product, "id">
): Promise<Product> {
  const dbProduct = {
    id: (+Math.random().toPrecision(4) * 10000).toString(),
    ...newProduct,
    quantity: 1,
  } as Product;

  if (products.has(dbProduct.id)) {
    throw new RepositoryError(ServiceErrorStatus.EXISTING_PRODUCT);
  }

  products.set(dbProduct.id, dbProduct);

  return dbProduct;
}

async function updateProduct(updatedProduct: Product): Promise<Product> {
  const dbProduct: ProductModel | undefined = products.get(updatedProduct.id);
  const productWithSameBarCode = await getProductByBarCode(
    updatedProduct.barCode
  );

  if (
    productWithSameBarCode &&
    productWithSameBarCode.id !== updatedProduct.id
  ) {
    throw new RepositoryError(ServiceErrorStatus.EXISTING_UPDATED_BARCODE);
  }

  if (!dbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  products.set(dbProduct.id, updatedProduct);

  return _simulateDelay(updatedProduct);
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
    ...dbProduct,
    quantity: newQuantity,
  };

  products.set(dbProduct.id, updatedProduct);

  return _simulateDelay(updatedProduct);
}

function deleteProduct(id: string): void {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  products.delete(id);
}

export const ProductRepository = {
  getProducts,
  getProductById,
  getProductByBarCode,
  insertProduct,
  updateProduct,
  updateProductQuantity,
  deleteProduct,
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
  EXISTING_UPDATED_BARCODE = "EXISTING_UPDATED_BARCODE",
  PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
}
