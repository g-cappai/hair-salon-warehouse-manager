import { Loading } from "./Loading";
import { Dialog } from "@features/ui/components";
import { Suspense } from "react";
import { DialogContent } from "./DialogContent";

type Props = {
  isOpen: boolean;
  barCode: string;
  onCreateProduct: () => void;
  onUpdateProduct: () => void;
  onClose: () => void;
};

export function ScannedProductDialog({
  isOpen,
  barCode,
  onCreateProduct,
  onUpdateProduct,
  onClose,
}: Props) {
  if (!barCode) {
    console.log("ProductDiscoveryModal: barCode is required");
    return null;
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loading />}>
        <DialogContent
          barCode={barCode}
          onUpdateProduct={onUpdateProduct}
          onCreateProduct={onCreateProduct}
          onClose={onClose}
        />
      </Suspense>
    </Dialog>
  );
}
