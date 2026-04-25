import { useAppMessage } from "../../../app/hooks/useAppMessage";
import { GenericModal } from "../../../components/Antd/Modals/GenericModal";
import { depositMoney } from "../services/account.service";
import type { DepositRequest } from "../types/account.types";
import DepositForm from "./DepositForm";

type Props = {
  open: boolean;
  onClose: () => void;
  accountNumber: string;
};

export default function DepositModal({ open, onClose, accountNumber }: Props) {
  const { contextHolder, showMessage } = useAppMessage();

  const handleDeposit = async (value: DepositRequest) => {
    try {
      await depositMoney(value);
      showMessage("success", "Deposit success!");
        // onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "ACCOUNT_NOT_FOUND") {
          showMessage("error", "Account number does not exist!");
        } else if (error.message === "INVALID_AMOUNT") {
          showMessage("error", "Invalid amount!");
        } else if (error.message === "FRONZEN_ACCOUNT") {
          showMessage("error", "Account is frozen!");
        } else {
          showMessage("error", "Deposit failed!");
        }
      } else {
        showMessage("error", "Unknown error!");
      }
    }
  };
  return (
    <>
      {contextHolder}
      <GenericModal open={open} onClose={onClose} title="Deposit" footer={null}>
        <DepositForm
          onSubmit={handleDeposit}
          accountNumber={accountNumber}
        ></DepositForm>
      </GenericModal>
    </>
  );
}
