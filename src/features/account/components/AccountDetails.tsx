import { Badge } from "antd";
import GenericCard from "../../../components/Antd/Cards/GenericCard";
import type { AccountResponse } from "../types/account.types";

type Props = {
  accountDetails: AccountResponse;
};

export function AccountDetails({ accountDetails }: Props) {
  return (
    <>
      <GenericCard title="Account Information">
        <p className="font-bold">
          Account Number:{" "}
          <span className="font-normal">{accountDetails?.accountNumber}</span>
        </p>
        <p className="font-bold">
          Owner Name:{" "}
          <span className="font-normal">{accountDetails?.ownerName}</span>
        </p>
        <p className="font-bold">
          Balance:{" "}
          <span
            className={`${(accountDetails?.balance ?? 0) < 100 ? "text-red-600" : "text-green-600"}`}
          >
            {accountDetails?.balance?.toLocaleString()} $
          </span>
        </p>
        <p className="font-bold">
          Status:{" "}
          <Badge
            style={{ marginBottom: "3px" }}
            color={accountDetails?.status === "Frozen" ? "red" : "green"}
            count={accountDetails?.status}
          />
        </p>
      </GenericCard>
    </>
  );
}
