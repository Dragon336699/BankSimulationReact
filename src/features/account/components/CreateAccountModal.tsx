import { useAppMessage } from "../../../app/hooks/useAppMessage";
import { GenericModal } from "../../../components/Antd/Modals/GenericModal";
import { accountApi } from "../apis/account.api";
import type { CreateAccountRequest } from "../types/account.types";
import AccountForm from "./AccountForm";

export function CreateAccountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { contextHolder, showMessage } = useAppMessage();

  const handleCreate = async (data: CreateAccountRequest) => {
    try {
      await accountApi.createAccount(data);
    } catch (error: unknown) {
      let message = "Something went wrong while toggling status";

      if (error instanceof Error) {
        message = error.message;
      }

      showMessage("error", message);
    }
  };
  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title="Create new account"
      footer={null}
    >
      {contextHolder}
      <AccountForm onSubmit={handleCreate}></AccountForm>
    </GenericModal>
  );
}
