import { Button } from 'antd';
import AccountList from "../../features/account/components/AccountList";
import { useState } from 'react';
import { CreateAccountModal } from '../../features/account/components/CreateAccountModal';

export default function AccountPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <div className="p-4">
      <Button className='mb-4' onClick={() => setIsCreateModalOpen(true)}>Create new account</Button>
      <AccountList />

      <CreateAccountModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}></CreateAccountModal>
    </div>
  );
}
