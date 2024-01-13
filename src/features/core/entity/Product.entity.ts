export type Product = {
  id: string;
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
  details: ProductDetail[];
};

export type ProductDetail = {
  categoryDetailId: string;
  value: string;
};
