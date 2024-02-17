import { useGetProductByBarCode } from "@features/core/data-access/hooks/product";
import { ProductFoundContent } from "./ProductFoundContent";
import { ProductNotFoundContent } from "./ProductNotFoundContent";

type Props = { barCode: string; onCreate: () => void; onClose: () => void };

export function DialogContent({ barCode, onCreate, onClose }: Props) {
  const { data: product } = useGetProductByBarCode(barCode);

  if (!product) {
    return (
      <ProductNotFoundContent
        barCode={barCode}
        onClose={onClose}
        onCreate={onCreate}
      />
    );
  }

  return <ProductFoundContent product={product} onClose={onClose} />;
}
