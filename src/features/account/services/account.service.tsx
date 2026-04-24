import { transactionApi } from "../../transaction/apis/transaction.api";
import { accountApi } from "../apis/account.api";
import type { DepositRequest, TransferRequest } from "../types/account.types";

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

  await transactionApi.addTransaction({
    accountNumber: value.accountNumber,
    type: "Deposit",
    amount: value.amount,
    transactionDate: new Date(),
    description: "Deposit money",
  });
}

export async function withdrawMoney(value: DepositRequest) {
  const user = await accountApi.getAccountDetails(value.accountNumber);

  if (!user) {
    throw new Error("ACCOUNT_NOT_FOUND");
  }

  if (value.amount <= 0) {
    throw new Error("INVALID_AMOUNT");
  }

  const newBalance = user.balance - value.amount;

  if (newBalance < 100) {
    throw new Error("INSUFFICIENT_FUNDS");
  }

  await accountApi.withdraw(newBalance, user.id);

  await transactionApi.addTransaction({
    accountNumber: value.accountNumber,
    type: "Withdraw",
    amount: value.amount,
    transactionDate: new Date(),
    description: "Withdraw money",
  });
}

export async function transferMoney(value: TransferRequest) {
  const sourceUser = await accountApi.getAccountDetails(value.sourceAccountNumber);

  if (!sourceUser) {
    throw new Error("SOURCE_ACCOUNT_NOT_FOUND");
  }

  if (value.amount <= 0) {
    throw new Error("INVALID_AMOUNT");
  }

  const sourceUserNewBalance = sourceUser.balance - value.amount;

  if (sourceUserNewBalance < 100) {
    throw new Error("INSUFFICIENT_FUNDS");
  }

  const desUser = await accountApi.getAccountDetails(value.destinationAccountNumber);

  if (!desUser) {
    throw new Error("DESTINATION_ACCOUNT_NOT_FOUND");
  }

  const desUserNewBalance = desUser.balance + value.amount;

  await accountApi.withdraw(sourceUserNewBalance, sourceUser.id);

  await accountApi.deposit(desUserNewBalance, desUser.id);

  await transactionApi.addTransaction({
    accountNumber: value.sourceAccountNumber,
    type: "Transfer",
    amount: value.amount,
    transactionDate: new Date(),
    description: value.description,
  });

  // await transactionApi.addTransaction({
  //   accountNumber: value.destinationAccountNumber,
  //   type: "Transfer",
  //   amount: value.amount,
  //   transactionDate: new Date(),
  //   description: value.description,
  // });
}
