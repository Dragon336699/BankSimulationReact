import { useEffect, useState } from "react";
import { Badge, Button, Table } from "antd";
import { accountApi } from "../apis/account.api";
import type { AccountResponse, AccountStatus } from "../types/account.types";
import { Link } from "react-router";
import { useAppMessage } from "../../../app/hooks/useAppMessage";

export default function AccountList() {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const { contextHolder, showMessage } = useAppMessage();
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

  const toggleStatus = async (account: AccountResponse) => {
    try {
      if (account.status === "Active") {
        account.status = "Frozen";
      } else {
        account.status = "Active";
      }
      await accountApi.toggleStatus(account);
    } catch (error: unknown) {
      let message = "Something went wrong while toggling status";

      if (error instanceof Error) {
        message = error.message;
      }

      showMessage("error", message);
    }
  };

  const columns = [
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      render: (value: string) => (
        <Link className="p-0 block w-fit" to={`/account/details/${value}`}>
          <p className="text-blue-600 underline hover:text-blue-800">{value}</p>
        </Link>
      ),
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
        <span
          className={(value ?? 0) < 100 ? "text-red-600" : "text-green-600"}
        >
          {value?.toLocaleString()} $
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value?: AccountStatus) => (
        <span
          className={value === "Frozen" ? "text-red-600" : "text-green-600"}
        >
          <Badge className="mb-2" color={value === "Frozen" ? "red" : "green"} count={value} />
        </span>
      ),
    },
    {
      title: "Froze/Unfroze",
      key: "action",
      render: (record: AccountResponse) => (
        <Button
          className="w-[100px]"
          onClick={() => toggleStatus(record)}
          type={record.status === "Frozen" ? "primary" : "primary"}
          danger={record.status !== "Frozen"}
        >
          {record.status === "Frozen" ? "Unfreeze" : "Freeze"}
        </Button>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table dataSource={accounts} columns={columns} />
    </>
  );
}
