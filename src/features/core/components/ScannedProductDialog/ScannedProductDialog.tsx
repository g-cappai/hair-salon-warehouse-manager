import { Loading } from "./Loading";
import { Dialog } from "@features/ui/components";
import { Suspense } from "react";
import { DialogContent } from "./DialogContent";

type Props = { isOpen: boolean; barCode: string; onClose: () => void };

export function ScannedProductDialog({ isOpen, barCode, onClose }: Props) {
  if (!barCode) {
    console.log("ProductDiscoveryModal: barCode is required");
    return null;
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loading />}>
        <DialogContent
          barCode={barCode}
          onCreate={() => null}
          onClose={onClose}
        />
      </Suspense>
    </Dialog>
  );
}
