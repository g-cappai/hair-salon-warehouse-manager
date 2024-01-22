import { Loading } from "./Loading";
import { Modal } from "@features/ui/components";
import { Suspense } from "react";
import { ModalContent } from "./ModalContent";

type Props = { isOpen: boolean; barCode: string; onClose: () => void };

export function ProductDiscoveryModal({ isOpen, barCode, onClose }: Props) {
  if (!barCode) {
    console.log("ProductDiscoveryModal: barCode is required");
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loading />}>
        <ModalContent barCode={barCode} onClose={onClose} />
      </Suspense>
    </Modal>
  );
}
