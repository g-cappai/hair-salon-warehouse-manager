import { Product } from "../../entity/Product.entity";
import {
  IProductRepository,
  InsertProductParams,
  UpdateProductParams,
} from "./types";

type ProductModel = {
  id: string;
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
  details: ProductDetailsModel[];
};

type ProductDetailsModel = {
  categoryDetailId: string;
  value: string;
};

const products = new Map<string, ProductModel>();

// -----------------------------------------------------------------------------

async function getProductById(id: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    return null;
  }

  return dbProduct;
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = Array.from(
    products.values()
  ).find((p) => p.barCode === barCode);

  if (!dbProduct) {
    return null;
  }

  return dbProduct;
}

async function getProducts(): Promise<Product[]> {
  const dbProducts = Array.from(products.values());
  return dbProducts;
}

async function insertProduct(
  newProduct: InsertProductParams
): Promise<Product> {
  const dbProduct = {
    id: (+Math.random().toPrecision(4) * 10000).toString(),
    ...newProduct,
  };

  if (products.has(dbProduct.id)) {
    throw new RepositoryError(ServiceErrorStatus.EXISTING_PRODUCT);
  }

  products.set(dbProduct.id, dbProduct);

  return dbProduct;
}

async function updateProduct(
  updatedProductData: UpdateProductParams
): Promise<Product> {
  const dbProduct: ProductModel | undefined = products.get(
    updatedProductData.id
  );

  if (!dbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, barCode, ...rest } = updatedProductData;
  const updatedProduct = {
    ...dbProduct,
    ...rest,
  } as ProductModel;

  products.set(dbProduct.id, updatedProduct);

  return updatedProduct;
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

  return updatedProduct;
}

function deleteProduct(id: string): void {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  products.delete(id);
}

export const ProductRepository: IProductRepository = {
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
