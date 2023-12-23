import {
  AvailableCategories,
  CategoryLabel,
} from "@features/product/entity/Product.entity";
import Realm, { ObjectSchema } from "realm";

export class CategoryInfo extends Realm.Object<CategoryInfo> {
  code?: string;
  color?: string;
  name?: string;
  number?: string;
  tones?: string;
  volumes?: string;

  static schema: ObjectSchema = {
    name: "CategoryInfo",
    embedded: true,
    properties: {
      code: "string?",
      color: "string?",
      name: "string?",
      number: "string?",
      tones: "string?",
      volumes: "string?",
    },
  };
}

export class ProductModel extends Realm.Object<ProductModel> {
  _id!: Realm.BSON.ObjectId;
  barCode!: string;
  brand?: string;
  quantity!: number;
  category!: CategoryLabel;
  categoryInfo!: Omit<AvailableCategories, "category">;

  static schema: ObjectSchema = {
    name: "Product",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      barCode: { type: "string", indexed: true },
      brand: "string?",
      category: "string",
      quantity: "int",
      categoryInfo: "CategoryInfo",
    },
    primaryKey: "_id",
  };
}
