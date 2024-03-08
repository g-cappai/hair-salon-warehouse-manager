import { Brand } from "@features/core/entity/Brand.entity";
import { IBrandRepository } from "./types";
import { brands } from "./in-memory.data";

export type BrandModel = {
  id: string;
  name: string;
};

export async function getBrandById(id: string): Promise<Brand | null> {
  return brands.get(id) ?? null;
}

export async function getBrands(): Promise<Brand[]> {
  return Array.from(brands.values());
}

export async function getBrandsByIds(ids: string[]): Promise<Brand[]> {
  const brandsByIds: Brand[] = [];
  for (const id of ids) {
    const brand = await getBrandById(id);
    if (brand) {
      brandsByIds.push(brand);
    }
  }
  return brandsByIds;
}

export const BrandRepository: IBrandRepository = {
  getBrandById,
  getBrands,
  getBrandsByIds,
};
