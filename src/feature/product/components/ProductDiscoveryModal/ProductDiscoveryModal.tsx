import { useGetProductByBarCode } from "../../hooks/useGetProductByBarCode";
import { CreateNew } from "./CreateNew";
import { UpdateQuantity } from "./UpdateQuantity";
import { Loading } from "./Loading";

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
    return <CreateNew barCode={barCode} onSubmit={onClose} />;
  }

  return <UpdateQuantity />;
}
