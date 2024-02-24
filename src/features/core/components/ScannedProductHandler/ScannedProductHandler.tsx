import { Dialog, View } from "@features/ui/components";
import { StyleSheet } from "react-native";
import { CreateProductModal } from "./CreateProductModal";
import { useEffect, useState } from "react";
import { useGetProductByBarCode } from "@features/core/data-access/hooks/product";
import { useRouter } from "@features/navigation/hooks";
import { ProductFoundContent } from "./ScannedProductDialog/ProductFoundContent";
import { ProductNotFoundContent } from "./ScannedProductDialog/ProductNotFoundContent";

type Props = {
  barCode: string;
  resetBarcode: () => void;
};

export function ScannedProductHandler({ barCode, resetBarcode }: Props) {
  const router = useRouter();

  const { data: product } = useGetProductByBarCode(barCode);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (barCode) {
      setIsDialogOpen(true);
    }
  }, [barCode]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetBarcode();
  };

  const handleCreateProduct = () => {
    setIsCreateModalOpen(true);
    setIsDialogOpen(false);
  };

  const handleUpdateProduct = (id: string) => {
    resetBarcode();
    router.push({
      pathname: "/warehouse/product/[id]",
      params: { id },
    });
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    resetBarcode();
  };

  if (!barCode) return null;

  return (
    <View style={styles.row}>
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        {product ? (
          <ProductFoundContent
            product={product}
            onCancel={handleCloseDialog}
            onUpdateProduct={handleUpdateProduct}
            onSuccessfulUpdate={handleCloseDialog}
          />
        ) : (
          <ProductNotFoundContent
            barCode={barCode}
            onCancel={handleCloseDialog}
            onCreateProduct={handleCreateProduct}
          />
        )}
      </Dialog>
      <CreateProductModal
        barCode={barCode}
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    maxHeight: "50%",
  },
});
