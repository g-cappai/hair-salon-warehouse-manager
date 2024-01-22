import { useGetProductByBarCode } from "@features/core/data-access/hooks/product";
import { CreateProductForm } from "./CreateProductForm";
import { UpdateProductForm } from "./UpdateProductForm";

type Props = { barCode: string; onClose: () => void };

export function ModalContent({ barCode, onClose }: Props) {
  const { data: product } = useGetProductByBarCode(barCode);

  if (!product) {
    return <CreateProductForm barCode={barCode} onSubmit={onClose} />;
  }

  return <UpdateProductForm product={product} onCancel={onClose} />;
}
