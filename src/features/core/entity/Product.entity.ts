export type Product = {
  id: string;
  barCode: string;
  quantity: number;
  brand: Brand;
  category: Category;
  details: ProductDetail[];
};

export type ProductDetail = {
  categoryDetail: CategoryDetail;
  value: string;
};

// ---------------------------------------------------------------------------- //

export type Brand = {
  id: string;
  name: string;
};

// ---------------------------------------------------------------------------- //

export type Category = {
  id: string;
  name: string;
};

export type CategoryDetailType = "string";

export type CategoryDetail = {
  id: string;
  categoryId: string;
  label: string;
  type: "string";
};
