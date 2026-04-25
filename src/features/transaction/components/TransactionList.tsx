import { useEffect, useState } from "react";
import type {
  TransactionResponse,
  TransactionType,
} from "../types/transaction.types";
import { transactionApi } from "../apis/transaction.api";
import { Table } from "antd";
import { Select } from "antd";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionResponse[]
  >([]);
  const options = [
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
  ];

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await transactionApi.getAllTransactions();
        setTransactions(res.data);
        setFilteredTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTransactions();
  }, []);

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
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const handleFilter = (value: TransactionType[]) => {
    if (value.length === 0) {
      return setFilteredTransactions(transactions);
    }

    const filtered = transactions.filter((t) => value.includes(t.type as TransactionType));
    setFilteredTransactions(filtered);
  };

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select type of transaction you want to filter"
        onChange={handleFilter}
        options={options}
      />
      <Table rowKey="id" dataSource={filteredTransactions} columns={columns}></Table>;
    </>
  );
}
