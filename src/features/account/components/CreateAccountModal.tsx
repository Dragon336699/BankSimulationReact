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
  const handleCreate = async (data: CreateAccountRequest) => {
    try {
      await accountApi.createAccount(data);
    } finally {
      console.log("Create done");
    }
  };
  return (
    <GenericModal open={open} onClose={onClose} title="Create new account" footer={null}>
      <AccountForm onSubmit={handleCreate}></AccountForm>   
    </GenericModal>
  );
}
