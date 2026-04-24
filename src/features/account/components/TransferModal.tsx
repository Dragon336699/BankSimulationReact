import { useAppMessage } from "../../../app/hooks/useAppMessage";
import { GenericModal } from "../../../components/Antd/Modals/GenericModal";
import { transferMoney } from "../services/account.service";
import type { TransferRequest } from "../types/account.types";
import TransferForm from "./TransferForm";

type Props = {
  open: boolean;
  onClose: () => void;
  sourceAccountNumber: string;
};

export default function TransferModal({
  open,
  onClose,
  sourceAccountNumber,
}: Props) {
  const { contextHolder, showMessage } = useAppMessage();
  const handleSubmit = async (values: TransferRequest) => {
    try {
        await transferMoney(values);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "SOURCE_ACCOUNT_NOT_FOUND") {
          showMessage("error", "Source account number does not exist!");
        } else if (error.message === "DESTINATION_ACCOUNT_NOT_FOUND") {
          showMessage("error", "Destination account number does not exist!");
        } else if (error.message === "INVALID_AMOUNT") {
          showMessage("error", "Invalid amount!");
        } else if (error.message === "INSUFFICIENT_FUNDS") {
          showMessage("error", "Insufficient funds!");
        } else {
          showMessage("error", "Transfer failed!");
        }
      }
    }
  };
  return (
    <>
      {contextHolder}
      <GenericModal
        open={open}
        title="Transfer money"
        onClose={onClose}
        footer={null}
      >
        <TransferForm
          onSubmit={handleSubmit}
          sourceAccountNumber={sourceAccountNumber}
        />
      </GenericModal>
    </>
  );
}
