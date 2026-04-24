import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { accountApi } from "../apis/account.api";
import type { AccountResponse } from "../types/account.types";
import { Link } from "react-router";

export default function AccountList() {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const getAllAccounts = async () => {
    try {
      const response = await accountApi.getAllAccounts();
      setAccounts(response.data);
    } finally {
      console.log("Done");
    }
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  const columns = [
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value?: number) => (
        <span className={(value ?? 0) < 100 ? "text-red-600" : "text-green-600"}>
          {value?.toLocaleString()} $
        </span>
      ),
    },
    {
      title: "Details",
      key: "action",
      render: (record: AccountResponse) => (
        <Link className="p-0" to={`/account/details/${record.accountNumber}`}>
          <Button className="p-0">View Details</Button>
        </Link>
      ),
    },
  ];
  return <Table dataSource={accounts} columns={columns} />;
}
