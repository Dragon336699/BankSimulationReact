import type {
  TransactionResponse,
  TransactionType,
} from "../../transaction/types/transaction.types";
import GenericCard from "../../../components/Antd/Cards/GenericCard";
import { Table, Select } from "antd";
import { useState } from "react";

export default function TransactionHistory({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  const options = [];

  const [filteredTransaction, setFilteredTransactions] = useState<TransactionResponse[]>(transactions);

  options.push(
    {
      label: "Deposit",
      value: "Deposit",
    },
    {
      label: "Withdraw",
      value: "Withdraw",
    },
    {
      label: "Transfer",
      value: "Transfer",
    },
  );

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

  const handleFilter = (value: string[]) => {
    if (value.length === 0) {
      return setFilteredTransactions(transactions);
    } 

    const filtered = transactions.filter(t => value.includes(t.type));
    setFilteredTransactions(filtered);
  };

  return (
    <GenericCard title="Transaction History">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select type of transaction you want to filter"
        onChange={handleFilter}
        options={options}
      />
      <Table dataSource={filteredTransaction} columns={columns}></Table>
    </GenericCard>
  );
}
