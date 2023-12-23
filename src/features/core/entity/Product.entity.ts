export type CategoryLabel =
  | "color"
  | "pigment"
  | "oxygen"
  | "bleach"
  | "glossToner";

type BaseProductInfo = {
  id: string;
  barCode: string;
  brand: string;
  quantity: number;
};

type Category<T extends CategoryLabel, U> = {
  category: T;
} & U;

type ColorCategory = Category<
  "color",
  {
    name: string;
    number: string;
  }
>;

type PigmentCategory = Category<
  "pigment",
  {
    color: string;
  }
>;

type OxygenCategory = Category<
  "oxygen",
  {
    volumes: string;
  }
>;

type BleachCategory = Category<
  "bleach",
  {
    tones: string;
  }
>;

type GlossTonerCategory = Category<
  "glossToner",
  {
    color: string;
    code: string;
  }
>;

export type AvailableCategories =
  | ColorCategory
  | PigmentCategory
  | OxygenCategory
  | BleachCategory
  | GlossTonerCategory;

export type Product = BaseProductInfo & AvailableCategories;
