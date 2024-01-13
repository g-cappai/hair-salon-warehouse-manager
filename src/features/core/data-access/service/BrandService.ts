import { Brand } from "@features/core/entity/Brand.entity";
import { BrandRepository } from "../repository/brand.in-memory.repository";

export const BrandService = {
  getBrands,
  getBrandDetails,
  getBrandById,
};

async function getBrands(): Promise<Brand[]> {
  return BrandRepository.getBrands();
}

async function getBrandDetails(brandId: string): Promise<Brand | undefined> {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === brandId);
}

async function getBrandById(brandId: string): Promise<Brand | undefined> {
  return BrandRepository.getBrandById(brandId);
}
