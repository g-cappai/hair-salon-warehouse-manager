import {
  PopulatedProduct,
  PopulatedProductDetail,
  Product,
} from "../../entity/Product.entity";
import {
  BrandRepository,
  CategoryRepository,
  ProductRepository,
} from "../repository";

async function getProducts(): Promise<Product[]> {
  return ProductRepository.getProducts();
}

async function getPopulatedProducts(): Promise<PopulatedProduct[]> {
  const products = await ProductRepository.getProducts();
  const categoryIds = Array.from(new Set(products.map((p) => p.categoryId)));
  const brandIds = Array.from(new Set(products.map((p) => p.brandId)));

  const categories = await CategoryRepository.getCategoriesByIds(categoryIds);
  const categoryDetails =
    await CategoryRepository.getCategoryDetailsByCategoryIds(categoryIds);
  const brands = await BrandRepository.getBrandsByIds(brandIds);

  const populatedProducts = products
    .map((product) => {
      const category = categories.find((c) => c.id === product.categoryId);
      const brand = brands.find((b) => b.id === product.brandId);
      const details = product.details.map((detail) => {
        const categoryDetail = categoryDetails.find(
          (cd) => cd.id === detail.categoryDetailId
        );

        if (!categoryDetail) return null;

        return {
          value: detail.value,
          categoryDetail: categoryDetail,
        };
      });

      if (!category || !brand || details.some((d) => d === null)) return null;
      const { id, barCode, quantity } = product;
      return {
        id,
        barCode,
        quantity,
        category: category,
        brand: brand,
        details,
      };
    })
    .filter((p) => p !== null) as PopulatedProduct[];

  return populatedProducts;
}

async function __populateProduct(
  product: Product
): Promise<PopulatedProduct | null> {
  const category = await CategoryRepository.getCategoryById(product.categoryId);
  const brand = await BrandRepository.getBrandById(product.brandId);
  const categoryDetails = await CategoryRepository.getCategoryDetails(
    product.categoryId
  );

  const productDetails = product.details.map((productDetail) => {
    const categoryDetail = categoryDetails.find(
      (categoryDetail) => productDetail.categoryDetailId === categoryDetail.id
    );
    if (!categoryDetail) return null;
    return {
      value: productDetail.value,
      categoryDetail,
    };
  });

  if (!category || !brand || productDetails.some((d) => d === null))
    return null;

  return {
    id: product.id,
    barCode: product.barCode,
    quantity: product.quantity,
    category,
    brand,
    details: productDetails as PopulatedProductDetail[],
  };
}

async function getProductById(id: string): Promise<Product | null> {
  return ProductRepository.getProductById(id);
}

async function getPopulatedProductById(
  id: string
): Promise<PopulatedProduct | null> {
  const product = await ProductRepository.getProductById(id);
  if (!product) return null;

  return __populateProduct(product);
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  return ProductRepository.getProductByBarCode(barCode);
}

async function getPopulatedProductByBarCode(
  barCode: string
): Promise<PopulatedProduct | null> {
  const product = await ProductRepository.getProductByBarCode(barCode);

  if (!product) return null;

  return __populateProduct(product);
}

type InsertProductParams = Omit<Product, "id">;

async function createProduct(
  newProduct: InsertProductParams
): Promise<Product> {
  return ProductRepository.insertProduct(newProduct);
}

type UpdateProductParams = Omit<Partial<Product>, "barCode"> & {
  id: Product["id"];
};

async function updateProduct(
  updatedData: UpdateProductParams
): Promise<Product> {
  return ProductRepository.updateProduct(updatedData);
}

async function updateProductQuantity(
  id: string,
  newQuantity: number
): Promise<Product> {
  return ProductRepository.updateProductQuantity(id, newQuantity);
}

async function deleteProductById(id: string): Promise<void> {
  return ProductRepository.deleteProduct(id);
}

export default {
  getProducts,
  getPopulatedProducts,
  getProductById,
  getPopulatedProductById,
  getProductByBarCode,
  getPopulatedProductByBarCode,
  createProduct,
  updateProduct,
  updateProductQuantity,
  deleteProductById,
};
