import { useEffect, useMemo, useState } from "react";
import type {
  TransactionResponse,
  TransactionType,
} from "../types/transaction.types";
import { transactionApi } from "../apis/transaction.api";
import { Table } from "antd";
import { Select } from "antd";
import { useAppMessage } from "../../../app/hooks/useAppMessage";

export default function TransactionList() {
  const { contextHolder, showMessage } = useAppMessage();

  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  const [selectedType, setSelectedType] = useState<string[]>([]);

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
        res.data.sort(
          (a, b) =>
            new Date(b.transactionDate).getTime() -
            new Date(a.transactionDate).getTime(),
        );
        setTransactions(res.data);
      } catch (error: unknown) {
        let message = "Something went wrong while toggling status";

        if (error instanceof Error) {
          message = error.message;
        }

        showMessage("error", message);
      }
    };

    getTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions].sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime(),
    );

    if (selectedType.length > 0) {
      data = transactions.filter((t) => selectedType.includes(t.type));
    }

    return data;
  }, [transactions, selectedType]);

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

  return (
    <>
      {contextHolder}
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select type of transaction you want to filter"
        onChange={setSelectedType}
        options={options}
      />
      <Table
        rowKey="id"
        dataSource={filteredTransactions}
        columns={columns}
      ></Table>
      ;
    </>
  );
}
