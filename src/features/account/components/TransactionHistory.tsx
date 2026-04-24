import type { TransactionResponse, TransactionType } from "../../transaction/types/transaction.types";
import GenericCard from "../../../components/Antd/Cards/GenericCard";
import { Table } from "antd";

export default function TransactionHistory({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  const columns = [
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value?: number, record?: TransactionResponse) => {
        const colorMap: Record<TransactionType, string> = {
          Deposit: "text-green-600",
          Withdraw: "text-red-600",
          Transfer: "text-blue-600",
        };

        const type = record?.type as TransactionType;

        const color = type ? colorMap[type] : "text-black-600";
        return <span className={color}>{value?.toLocaleString()}$</span>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (value: Date) => new Date(value).toLocaleString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <GenericCard title="Transaction History">
      <Table dataSource={transactions} columns={columns}></Table>
    </GenericCard>
  );
}
