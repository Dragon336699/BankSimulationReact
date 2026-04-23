import { accountApi } from "../apis/account.api";
import type { DepositRequest } from "../types/account.types";

export async function depositMoney(value: DepositRequest) {
  const user = await accountApi.getAccountDetails(value.accountNumber);

  if (!user) {
    throw new Error("ACCOUNT_NOT_FOUND");
  }

  if (value.amount <= 0) {
    throw new Error("INVALID_AMOUNT");
  }

  const newBalance = user.balance + value.amount;

   await accountApi.deposit(newBalance, user.id);
}
