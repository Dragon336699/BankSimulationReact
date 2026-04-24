import { useEffect, useState } from "react";
import { AccountDetails } from "../../features/account/components/AccountDetails";
import DepositModal from "../../features/account/components/DepositModal";
import { Button } from "antd";
import { useParams } from "react-router";
import type { AccountResponse } from "../../features/account/types/account.types";
import { accountApi } from "../../features/account/apis/account.api";
import { WithdrawModal } from "../../features/account/components/WithdrawModal";
import TransferModal from "../../features/account/components/TransferModal";
import type { TransactionResponse } from "../../features/transaction/types/transaction.types";
import { transactionApi } from "../../features/transaction/apis/transaction.api";
import TransactionHistory from "../../features/account/components/TransactionHistory";

export default function AccountDetailPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const { accountNumber } = useParams();

  const [accountDetails, setAccountDetails] = useState<AccountResponse>();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    if (!accountNumber) return;

    const getAccountDetails = async () => {
      const data = await accountApi.getAccountDetails(accountNumber as string);
      setAccountDetails(data);
    };

    const getTransactionsByAccountNumber = async () => {
      try {
        const data =
          await transactionApi.getTransactionsByAccountNumber(accountNumber);
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    };

    getTransactionsByAccountNumber();

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
        <Button onClick={() => setIsWithdrawModalOpen(true)} size="large">
          Withdraw
        </Button>
        <Button onClick={() => setIsTransferModalOpen(true)} size="large">
          Transfer
        </Button>
      </div>
      <DepositModal
        accountNumber={accountNumber as string}
        open={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />

      <WithdrawModal
        accountNumber={accountNumber as string}
        open={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />

      <TransferModal
        open={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        sourceAccountNumber={accountNumber as string}
      />

      <div>
        <AccountDetails accountDetails={accountDetails} />
        <br />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
}
