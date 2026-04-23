import { useEffect, useState } from "react";
import type {
  TransactionResponse,
  TransactionType,
} from "../types/transaction.types";
import { transactionApi } from "../apis/transaction.api";
import { Table } from "antd";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await transactionApi.getAllTransactions();
        setTransactions(res.data);
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
          Withdrawal: "text-red-600",
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

  return <Table dataSource={transactions} columns={columns}></Table>;
}
