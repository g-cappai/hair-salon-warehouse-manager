import { Product, ProductDetail } from "../../entity/Product.entity";
import { BrandModel, BrandRepository } from "./brand.in-memory.repository";
import {
  CategoryModel,
  CategoryRepository,
} from "./category.in-memory.repository";

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

async function _simulateDelay<T>(val: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(val), 2000));
}

async function getProductById(id: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = products.get(id);

  if (!dbProduct) {
    return _simulateDelay(null);
  }

  const dbCategory: CategoryModel | undefined =
    await CategoryRepository.getCategoryById(dbProduct.categoryId);

  const dbBrand: BrandModel | undefined = await BrandRepository.getBrandById(
    dbProduct.brandId
  );

  return mapProductModelToProduct(dbProduct, dbCategory!, dbBrand!);
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  const dbProduct: ProductModel | undefined = Array.from(
    products.values()
  ).find((p) => p.barCode === barCode);

  if (!dbProduct) {
    return _simulateDelay(null);
  }

  const dbCategory: CategoryModel | undefined =
    await CategoryRepository.getCategoryById(dbProduct.categoryId);

  const dbBrand: BrandModel | undefined = await BrandRepository.getBrandById(
    dbProduct.brandId
  );

  return mapProductModelToProduct(dbProduct, dbCategory!, dbBrand!);
}

async function getProducts(): Promise<Product[]> {
  const dbProducts = Array.from(products.values());

  const brandIds = [...new Set(dbProducts.map((product) => product.brandId))];
  const categoryIds = [
    ...new Set(dbProducts.map((product) => product.categoryId)),
  ];

  const [brands, categories] = await Promise.all([
    BrandRepository.getBrandsByIds(brandIds),
    CategoryRepository.getCategoriesByIds(categoryIds),
  ]);

  const brandMap = new Map(brands.map((brand) => [brand.id, brand]));
  const categoryMap = new Map(
    categories.map((category) => [category.id, category])
  );

  return dbProducts.map((product) =>
    mapProductModelToProduct(
      product,
      categoryMap.get(product.categoryId)!,
      brandMap.get(product.brandId)!
    )
  );
}

type InsertProductParams = Omit<Product, "id">;

async function insertProduct(
  newProduct: InsertProductParams
): Promise<Product> {
  const dbProduct = mapProductToProductModel({
    id: (+Math.random().toPrecision(4) * 10000).toString(),
    ...newProduct,
  });

  if (products.has(dbProduct.id)) {
    throw new RepositoryError(ServiceErrorStatus.EXISTING_PRODUCT);
  }

  products.set(dbProduct.id, dbProduct);

  const dbCategory: CategoryModel | undefined =
    await CategoryRepository.getCategoryById(dbProduct.categoryId);

  const dbBrand: BrandModel | undefined = await BrandRepository.getBrandById(
    dbProduct.brandId
  );

  return mapProductModelToProduct(dbProduct, dbCategory!, dbBrand!);
}

type UpdateProductParams = Partial<Product> & { id: Product["id"] };

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

  const dbCategory: CategoryModel | undefined =
    await CategoryRepository.getCategoryById(dbProduct.categoryId);

  const dbBrand: BrandModel | undefined = await BrandRepository.getBrandById(
    dbProduct.brandId
  );

  products.set(dbProduct.id, updatedProduct);

  return mapProductModelToProduct(updatedProduct, dbCategory!, dbBrand!);
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

  const dbCategory: CategoryModel | undefined =
    await CategoryRepository.getCategoryById(dbProduct.categoryId);

  const dbBrand: BrandModel | undefined = await BrandRepository.getBrandById(
    dbProduct.brandId
  );

  return mapProductModelToProduct(updatedProduct, dbCategory!, dbBrand!);
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

function mapProductToProductModel(product: Product): ProductModel {
  const { id, barCode, brand, category, details, quantity } = product;

  return {
    id,
    barCode,
    quantity,
    brandId: brand.id,
    categoryId: category.id,
    details: details?.map(
      (detail) =>
        ({
          categoryDetailId: detail.categoryDetail.id,
          value: detail.value,
        } as ProductDetailsModel)
    ),
  };
}

function mapProductModelToProduct(
  productModel: ProductModel,
  categoryModel: CategoryModel,
  brandModel: BrandModel
): Product {
  const { id, barCode, quantity, details } = productModel;
  // Get brand from BrandRepository
  // Get category from CategoryRepository
  return {
    id,
    barCode,
    quantity,
    brand: categoryModel,
    category: brandModel,
    details: details?.map(
      (detail) =>
        ({
          categoryDetail: { id: detail.categoryDetailId },
          value: detail.value,
        } as ProductDetail)
    ),
  };
}

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
