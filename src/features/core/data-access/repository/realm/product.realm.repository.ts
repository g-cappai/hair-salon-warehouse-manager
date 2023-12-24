import { Product } from "../../../entity/Product.entity";
import { CategoryInfo, ProductModel } from "./models";
import Realm, { UpdateMode, BSON } from "realm";

let realm: Realm;

const getRealm = async () => {
  if (realm) {
    return realm;
  }
  try {
    realm = await Realm.open({ schema: [ProductModel, CategoryInfo] });
  } catch (error) {
    console.error(error);
  }

  return realm;
};

// -----------------------------------------------------------------------------

async function getProductById(id: string): Promise<Product | null> {
  const realm = await getRealm();
  const product = realm.objectForPrimaryKey<ProductModel>(
    "Product",
    BSON.ObjectID.createFromHexString(id)
  );

  if (!product) {
    return null;
  }

  return {
    id: product._id.toString(),
    brand: product.brand,
    barCode: product.barCode,
    category: product.category,
    ...product.categoryInfo,
  } as Product;
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  const realm = await getRealm();
  const products = realm.objects<ProductModel>("Product");
  const product = products.filtered("barCode == $0", barCode).at(0);

  if (!product) {
    return null;
  }

  return {
    id: product._id.toString(),
    brand: product.brand,
    barCode: product.barCode,
    category: product.category,
    ...product.categoryInfo,
  } as Product;
}

async function getProducts(): Promise<Product[]> {
  const realm = await getRealm();
  const products = realm.objects<ProductModel>("Product");

  return products.map((p) => ({
    id: p._id.toString(),
    brand: p.brand,
    barCode: p.barCode,
    category: p.category,
    quantity: p.quantity,
    ...p.categoryInfo,
  })) as Product[];
}

async function insertProduct(
  newProduct: Omit<Product, "id">
): Promise<Product> {
  const realm = await getRealm();
  const insertedProduct = realm.write(() => {
    const { barCode, brand, category, quantity, ...categoryInfo } = newProduct;
    const productModel = {
      barCode: barCode,
      brand: brand,
      category: category,
      quantity: quantity,
      categoryInfo: categoryInfo,
    };
    try {
      return realm.create<ProductModel>("Product", productModel);
    } catch (error) {
      console.error(error);
    }
  });

  if (!insertedProduct) {
    throw new Error("Impossibile inserire il prodotto!");
  }

  return {
    id: insertedProduct._id.toString(),
    brand: insertedProduct.brand,
    barCode: insertedProduct.barCode,
    category: insertedProduct.category,
    ...insertedProduct.categoryInfo,
  } as Product;
}

async function updateProduct(updatedProduct: Product): Promise<Product> {
  const realm = await getRealm();
  const updatedDbProduct = realm.write(() => {
    const { id, barCode, brand, category, quantity, ...categoryInfo } =
      updatedProduct;
    const productModel = {
      _id: id,
      barCode: barCode,
      brand: brand,
      category: category,
      quantity: quantity,
      categoryInfo: categoryInfo,
    };

    const product = realm.objectForPrimaryKey<ProductModel>(
      "Product",
      productModel
    );

    if (!product) {
      return;
    }

    return realm.create<ProductModel>("Product", product, UpdateMode.Modified);
  });

  // TODO: Check for barCode uniqueness

  if (!updatedDbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  return {
    id: updatedDbProduct._id.toString(),
    brand: updatedDbProduct.brand,
    barCode: updatedDbProduct.barCode,
    category: updatedDbProduct.category,
    ...updatedDbProduct.categoryInfo,
  } as Product;
}

async function updateProductQuantity(
  id: string,
  newQuantity: number
): Promise<Product> {
  const realm = await getRealm();
  const updatedDbProduct = realm.write(() => {
    const product = realm.objectForPrimaryKey<ProductModel>("Product", id);

    if (!product) {
      return;
    }

    return realm.create<ProductModel>(
      "Product",
      { quantity: newQuantity },
      UpdateMode.Modified
    );
  });

  // TODO: Check for barCode uniqueness

  if (!updatedDbProduct) {
    throw new RepositoryError(ServiceErrorStatus.PRODUCT_NOT_FOUND);
  }

  return {
    id: updatedDbProduct._id.toString(),
    brand: updatedDbProduct.brand,
    barCode: updatedDbProduct.barCode,
    category: updatedDbProduct.category,
    ...updatedDbProduct.categoryInfo,
  } as Product;
}

async function deleteProduct(id: string): Promise<void> {
  const realm = await getRealm();

  realm.write(() => {
    const product = realm.objectForPrimaryKey<ProductModel>(
      "Product",
      BSON.ObjectID.createFromHexString(id)
    );

    if (!product) {
      return;
    }

    try {
      realm.delete(product);
    } catch (error) {
      console.error(error);
    }
  });
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
