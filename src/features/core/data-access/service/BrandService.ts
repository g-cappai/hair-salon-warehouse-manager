import { Brand } from "@features/core/entity/Brand.entity";
import { BrandRepository } from "../repository/brand.in-memory.repository";

async function getBrands(): Promise<Brand[]> {
  return BrandRepository.getBrands();
}

async function getBrandDetails(brandId: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === brandId) ?? null;
}

async function getBrandById(brandId: string): Promise<Brand | null> {
  return BrandRepository.getBrandById(brandId);
}

export default {
  getBrands,
  getBrandDetails,
  getBrandById,
};
