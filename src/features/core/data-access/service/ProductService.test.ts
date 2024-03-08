import {
  BrandRepository,
  CategoryRepository,
  ProductRepository,
} from "../repository";
import ProductService from "./ProductService";
import { CategoryDetail } from "@features/core/entity/Category.entity";

describe("ProductService", () => {
  describe("getPopulatedProducts", () => {
    const mockProducts = [
      {
        id: "1",
        barCode: "1234",
        categoryId: "1",
        brandId: "1",
        quantity: 1,
        details: [{ categoryDetailId: "1", value: "Category 1 Name" }],
      },
      {
        id: "2",
        barCode: "5678",
        categoryId: "2",
        brandId: "2",
        quantity: 2,
        details: [{ categoryDetailId: "3", value: "Category 2 Name" }],
      },
      {
        id: "3",
        barCode: "0000",
        categoryId: "3",
        brandId: "2",
        quantity: 2,
        details: [{ categoryDetailId: "5", value: "Category 3 Name" }],
      },
    ];
    const mockCategories = [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
    ];
    const mockCategoryDetails = [
      {
        id: "1",
        categoryId: "1",
        type: "string",
        label: "Category 1 Name",
        required: true,
      },
      {
        id: "2",
        categoryId: "1",
        type: "string",
        label: "Category 1 Number",
        required: true,
      },
      {
        id: "3",
        categoryId: "2",
        type: "string",
        label: "Category 2 Name",
        required: true,
      },
      {
        id: "4",
        categoryId: "2",
        type: "string",
        label: "Category 2 Number",
        required: true,
      },
    ];
    const mockBrands = [
      { id: "1", name: "Brand 1" },
      { id: "2", name: "Brand 2" },
    ];

    jest
      .spyOn(ProductRepository, "getProducts")
      .mockResolvedValue(mockProducts);
    jest
      .spyOn(CategoryRepository, "getCategoriesByIds")
      .mockResolvedValue(mockCategories);
    jest
      .spyOn(CategoryRepository, "getCategoryDetailsByCategoryIds")
      .mockResolvedValue(mockCategoryDetails as CategoryDetail[]);
    jest.spyOn(BrandRepository, "getBrandsByIds").mockResolvedValue(mockBrands);

    it("should return populated products", async () => {
      const result = await ProductService.getPopulatedProducts();

      expect(result).toEqual([
        {
          id: "1",
          barCode: "1234",
          quantity: 1,
          category: {
            id: "1",
            name: "Category 1",
          },
          brand: {
            id: "1",
            name: "Brand 1",
          },
          details: [
            {
              value: "Category 1 Name",
              categoryDetail: {
                id: "1",
                categoryId: "1",
                type: "string",
                label: "Category 1 Name",
                required: true,
              },
            },
          ],
        },
        {
          id: "2",
          barCode: "5678",
          quantity: 2,
          category: {
            id: "2",
            name: "Category 2",
          },
          brand: {
            id: "2",
            name: "Brand 2",
          },
          details: [
            {
              value: "Category 2 Name",
              categoryDetail: {
                id: "3",
                categoryId: "2",
                type: "string",
                label: "Category 2 Name",
                required: true,
              },
            },
          ],
        },
      ]);
    });

    it("should skip products with broken relationships", async () => {
      /**
       * Ex. In case the corresponding category or brand is missing,
       * should skip the product in order to avoid exceptions when
       * trying to access the missing object.
       */

      const result = await ProductService.getPopulatedProducts();

      // Assert the result
      expect(result).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "3" })])
      );
    });
  });

  describe("getPopulatedProductById", () => {
    const mockProduct = {
      id: "1",
      barCode: "1234",
      categoryId: "1",
      brandId: "1",
      quantity: 1,
      details: [{ categoryDetailId: "1", value: "Category 1 Name" }],
    };
    const mockCategory = { id: "1", name: "Category 1" };
    const mockCategoryDetails = [
      {
        id: "1",
        categoryId: "1",
        type: "string",
        label: "Category 1 Name",
        required: true,
      },
    ];
    const mockBrand = { id: "1", name: "Brand 1" };

    jest
      .spyOn(ProductRepository, "getProductById")
      .mockResolvedValue(mockProduct);
    jest
      .spyOn(CategoryRepository, "getCategoryById")
      .mockResolvedValue(mockCategory);
    jest
      .spyOn(CategoryRepository, "getCategoryDetails")
      .mockResolvedValue(mockCategoryDetails as CategoryDetail[]);
    jest.spyOn(BrandRepository, "getBrandById").mockResolvedValue(mockBrand);

    it("should return populated product", async () => {
      const result = await ProductService.getPopulatedProductById("1");

      // Assert the result
      expect(result).toEqual({
        id: "1",
        barCode: "1234",
        quantity: 1,
        category: {
          id: "1",
          name: "Category 1",
        },
        brand: {
          id: "1",
          name: "Brand 1",
        },
        details: [
          {
            value: "Category 1 Name",
            categoryDetail: {
              id: "1",
              categoryId: "1",
              type: "string",
              label: "Category 1 Name",
              required: true,
            },
          },
        ],
      });
    });

    it("should skip products with broken relationships", async () => {
      /**
       * Ex. In case the corresponding category or brand is missing,
       * should skip the product in order to avoid exceptions when
       * trying to access the missing object.
       */

      const result = await ProductService.getPopulatedProductById("1");

      expect(result).not.toEqual(expect.objectContaining({ id: "3" }));
    });
  });
});
