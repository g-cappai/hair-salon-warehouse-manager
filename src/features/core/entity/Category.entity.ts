export type Category = {
  id: string;
  name: string;
};

export type CategoryDetailInputType = "string";

export type CategoryDetail = {
  id: string;
  categoryId: string;
  label: string;
  type: "string"; // may be "string" | "number" | "boolean" in the future
  required: boolean;
  defaultValue?: string;
};
