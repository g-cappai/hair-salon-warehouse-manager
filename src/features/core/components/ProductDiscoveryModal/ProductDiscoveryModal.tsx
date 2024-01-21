import { CreateProductForm } from "./CreateProductForm";
import { UpdateProductForm } from "./UpdateProductForm";
import { Loading } from "./Loading";
import { useGetProductByBarCode } from "@features/core/data-access/hooks/product";
import { Modal } from "@features/ui/components";

type Props = { isOpen: boolean; barCode: string; onClose: () => void };

export function ProductDiscoveryModal({ isOpen, barCode, onClose }: Props) {
  const { data: product, isFetching } = useGetProductByBarCode(barCode);

  // TODO: In case of error retry scanning

  let modalContent: React.ReactNode;

  if (isFetching) {
    modalContent = <Loading />;
  } else if (!product) {
    modalContent = <CreateProductForm barCode={barCode} onSubmit={onClose} />;
  } else {
    modalContent = (
      <UpdateProductForm
        productId={product.id}
        currentQuantity={product.quantity}
        onCancel={onClose}
      />
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );
}
