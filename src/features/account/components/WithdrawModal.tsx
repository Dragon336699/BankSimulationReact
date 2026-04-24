import { useAppMessage } from "../../../app/hooks/useAppMessage";
import { GenericModal } from "../../../components/Antd/Modals/GenericModal";
import { withdrawMoney } from "../services/account.service";
import type { WithdrawRequest } from "../types/account.types";
import { WithdrawForm } from "./WithdrawForm";

type Props = {
  open: boolean;
  onClose: () => void;
  accountNumber: string;
};

export function WithdrawModal({ open, onClose, accountNumber }: Props) {
  const { contextHolder, showMessage } = useAppMessage();
  const handleWithdraw = async (value: WithdrawRequest) => {
    try {
      await withdrawMoney(value);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "ACCOUNT_NOT_FOUND") {
          showMessage("error", "Account number does not exist!");
        } else if (error.message === "INVALID_AMOUNT") {
          showMessage("error", "Invalid amount!");
        } else if (error.message === "INSUFFICIENT_FUNDS") {
          showMessage(
            "error",
            "Insufficient funds! Minimum balance must be 100!",
          );
        } else {
          showMessage("error", "Withdraw failed!");
        }
      } else {
        showMessage("error", "Unknown error!");
      }
    }
  };
  return (
    <>
      {contextHolder}
      <GenericModal open={open} onClose={onClose} footer={null}>
        <WithdrawForm onSubmit={handleWithdraw} accountNumber={accountNumber} />
      </GenericModal>
    </>
  );
}
