import { Product } from "../entity/Product.entity";

type ProductModel = {
  id: string;
  barcode: string;
  name: string;
  quantity: number;
};

const products = new Map<string, ProductModel>();

// -----------------------------------------------------------------------------

async function getProductByBarcode(barcode: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = Array.from(
    products.values()
  ).find((p) => p.barcode === barcode);

  if (!dbProduct) {
    return null;
  }

  return {
    id: barcode,
    barcode: dbProduct.barcode,
    name: dbProduct.name,
    quantity: dbProduct.quantity,
  };
}

async function insertProduct({
  barcode,
  name,
  quantity,
}: Omit<Product, "id">): Promise<Product> {
  const dbProduct: ProductModel = { id: barcode, barcode, name, quantity };

  if (products.has(barcode)) {
    throw new RepositoryError(ServiceErrorStatus.EXISTING_PRODUCT);
  }

  products.set(barcode, dbProduct);

  return { id: barcode, barcode, name, quantity };
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
    barcode: dbProduct.barcode,
    name: dbProduct.name,
    quantity: newQuantity,
  };

  products.set(dbProduct.id, updatedProduct);

  return {
    id: dbProduct.barcode,
    barcode: dbProduct.barcode,
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
  getProductByBarcode,
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
