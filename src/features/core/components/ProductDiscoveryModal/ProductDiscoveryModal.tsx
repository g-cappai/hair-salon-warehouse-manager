import { CreateProductForm } from "./CreateProductForm";
import { UpdateProductForm } from "./UpdateProductForm";
import { Loading } from "./Loading";
import { useGetProductByBarCode } from "@features/core/data-access/hooks/product";

type Props = { isOpen: boolean; barCode: string; onClose: () => void };

export function ProductDiscoveryModal({ isOpen, barCode, onClose }: Props) {
  const { data: product, isFetching } = useGetProductByBarCode(barCode);

  // TODO: In case of error retry scanning

  // TODO: In which case can be opened but we don't have a code?

  if (!isOpen || !barCode) {
    return;
  }

  if (isFetching) {
    return <Loading />;
  }

  if (!product) {
    return <CreateProductForm barCode={barCode} onSubmit={onClose} />;
  }

  return (
    <UpdateProductForm
      productId={product.id}
      currentQuantity={product.quantity}
      onCancel={onClose}
    />
  );
}
