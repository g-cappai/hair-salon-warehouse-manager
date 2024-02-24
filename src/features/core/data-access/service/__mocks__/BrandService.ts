import { Brand } from "@features/core/entity/Brand.entity";

const mockBrands: Brand[] = [
  { id: "1", name: "Brand 1" },
  { id: "2", name: "Brand 2" },
  { id: "3", name: "Brand 3" },
];

async function getBrands(): Promise<Brand[]> {
  return mockBrands;
}

async function getBrandDetails(brandId: string): Promise<Brand | null> {
  const brand = mockBrands.find((brand) => brand.id === brandId);
  return brand ?? null;
}

async function getBrandById(brandId: string): Promise<Brand | null> {
  const brand = mockBrands.find((brand) => brand.id === brandId);
  return brand ?? null;
}

export default {
  getBrands,
  getBrandDetails,
  getBrandById,
};
