import { useGetProductByBarCode } from "@features/core/data-access/hooks/product";
import { ProductFoundContent } from "./ProductFoundContent";
import { ProductNotFoundContent } from "./ProductNotFoundContent";

type Props = {
  barCode: string;
  onCreateProduct: () => void;
  onUpdateProduct: () => void;
  onClose: () => void;
};

export function DialogContent({
  barCode,
  onCreateProduct,
  onUpdateProduct,
  onClose,
}: Props) {
  const { data: product } = useGetProductByBarCode(barCode);

  if (!product) {
    return (
      <ProductNotFoundContent
        barCode={barCode}
        onClose={onClose}
        onCreateProduct={onCreateProduct}
      />
    );
  }

  return (
    <ProductFoundContent
      product={product}
      onClose={onClose}
      onUpdateProduct={onUpdateProduct}
    />
  );
}
