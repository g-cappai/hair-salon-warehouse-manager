import { PopulatedProduct } from "@features/core/entity/Product.entity";
import { Link } from "@features/navigation/components";
import { Text } from "@features/ui/components";
import { Pressable } from "react-native";

type Props = {
  product: PopulatedProduct;
};

export function WarehouseListItem({ product }: Props) {
  return (
    <Link
      href={{
        pathname: "/warehouse/product/[id]",
        params: { id: product.id },
      }}
    >
      <Pressable>
        <Text variant="body">{`Barcode: ${product.barCode} | Quantity: ${product.quantity} `}</Text>
        <Text variant="body">{`Brand: ${product.brand.name} | Category: ${product.category.name}`}</Text>
      </Pressable>
    </Link>
  );
}
