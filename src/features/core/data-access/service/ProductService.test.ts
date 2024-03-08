import {
  BrandRepository,
  CategoryRepository,
  ProductRepository,
} from "../repository";
import { __seedInMemory } from "../repository/in-memory.data";
import ProductService from "./ProductService";
import { CategoryDetail } from "@features/core/entity/Category.entity";

jest.mock("../repository");

describe("ProductService", () => {
  describe("getPopulatedProducts", () => {
    __seedInMemory();

    it("should return populated products", async () => {
      const result = await ProductService.getPopulatedProducts();

      expect(result).toEqual([
        {
          id: "1",
          barCode: "1234",
          quantity: 1,
          category: {
            id: "1",
            name: "cat.1",
          },
          brand: {
            id: "1",
            name: "brand.1",
          },
          details: [
            {
              value: "cat.det.0.val",
              categoryDetail: {
                id: "0",
                categoryId: "1",
                type: "string",
                label: "cat.det.0.label",
                required: true,
              },
            },
            {
              value: "cat.det.1.val",
              categoryDetail: {
                id: "1",
                categoryId: "1",
                type: "string",
                label: "cat.det.1.label",
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
            name: "cat.2",
          },
          brand: {
            id: "2",
            name: "brand.2",
          },
          details: [
            {
              value: "cat.det.2.val",
              categoryDetail: {
                id: "2",
                categoryId: "2",
                type: "string",
                label: "cat.det.2.label",
                required: true,
              },
            },
            {
              value: "cat.det.3.val",
              categoryDetail: {
                id: "3",
                categoryId: "2",
                type: "string",
                label: "cat.det.3.label",
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
