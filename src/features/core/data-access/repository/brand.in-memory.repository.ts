import { Brand } from "@features/core/entity/Brand.entity";

export type BrandModel = {
  id: string;
  name: string;
};

const brands = new Map<string, BrandModel>(
  [
    { id: "0", name: "Alfaparf" },
    { id: "1", name: "Evolution" },
  ].map((v) => [v.id, v])
);

export async function getBrandById(id: string): Promise<Brand | undefined> {
  return brands.get(id);
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

export const BrandRepository = { getBrandById, getBrands, getBrandsByIds };
