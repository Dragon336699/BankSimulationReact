import { useEffect, useState } from "react";
import { AccountDetails } from "../components/AccountDetails";
import DepositModal from "../components/DepositModal";
import { Button } from "antd";
import { useParams } from "react-router";
import type { AccountResponse } from "../types/account.types";
import { accountApi } from "../apis/account.api";

export default function AccountDetailPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const { accountNumber } = useParams();

  const [accountDetails, setAccountDetails] = useState<AccountResponse>();

  useEffect(() => {
    if (!accountNumber) return;
    
    const getAccountDetails = async () => {
      const data = await accountApi.getAccountDetails(accountNumber as string);
      setAccountDetails(data);
    };

    getAccountDetails();
  }, [accountNumber]);

  if (!accountDetails) return <>Loading...</>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      <div className="flex gap-3 mb-4">
        <Button onClick={() => setIsDepositModalOpen(true)} size="large">
          Deposit
        </Button>
        <Button size="large">Withdraw</Button>
        <Button size="large">Transfer</Button>
      </div>
      <AccountDetails
        accountNumber={accountNumber as string}
        accountDetails={accountDetails}
      />

      <DepositModal
        accountNumber={accountNumber as string}
        open={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </div>
  );
}
