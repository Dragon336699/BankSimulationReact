import { Button } from 'antd';
import AccountList from "../components/AccountList";
import { useState } from 'react';
import { CreateAccountModal } from '../components/CreateAccountModal';

export default function AccountPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <div className="p-4">
      <Button onClick={() => setIsCreateModalOpen(true)}>Create new account</Button>
      <AccountList />

      <CreateAccountModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}></CreateAccountModal>
    </div>
  );
}
