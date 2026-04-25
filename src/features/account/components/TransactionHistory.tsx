import type {
  TransactionResponse,
  TransactionType,
} from "../../transaction/types/transaction.types";
import GenericCard from "../../../components/Antd/Cards/GenericCard";
import { Table, Select } from "antd";
import { useMemo, useState } from "react";

export default function TransactionHistory({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const options = [
    { label: "Deposit", value: "Deposit" },
    { label: "Withdraw", value: "Withdraw" },
    { label: "Transfer", value: "Transfer" },
  ];

  transactions.sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime(),
  );

  const filteredTransaction = useMemo(() => {
    let data = [...transactions].sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime(),
    );

    if (selectedTypes.length > 0) {
      data = data.filter((t) => selectedTypes.includes(t.type));
    }

    return data;
  }, [transactions, selectedTypes]);

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
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select type of transaction you want to filter"
        onChange={setSelectedTypes}
        options={options}
      />
      <Table dataSource={filteredTransaction} columns={columns}></Table>
    </GenericCard>
  );
}
