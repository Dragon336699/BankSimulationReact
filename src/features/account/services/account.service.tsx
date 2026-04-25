import { transactionApi } from "../../transaction/apis/transaction.api";
import { accountApi } from "../apis/account.api";
import type {
  AccountResponse,
  DepositRequest,
  TransferRequest,
} from "../types/account.types";

/* ================== COMMON VALIDATION ================== */

const validateAccount = (user: AccountResponse, error: string) => {
  if (!user) throw new Error(error);
};

const validateAmount = (amount: number) => {
  if (amount <= 0) throw new Error("INVALID_AMOUNT");
};

const validateStatus = (status: string, error: string) => {
  if (status === "Frozen") throw new Error(error);
};

const validateBalance = (balance: number) => {
  if (balance < 100) throw new Error("INSUFFICIENT_FUNDS");
};

/* ================== WITHDRAW RULE ================== */

const isNewDayCheck = (lastDate: Date | string) => {
  if (!lastDate || lastDate === "0001-01-01T00:00:00") return true;

  const last = new Date(lastDate);
  const now = new Date();

  return (
    last.getFullYear() !== now.getFullYear() ||
    last.getMonth() !== now.getMonth() ||
    last.getDate() !== now.getDate()
  );
};

const handleWithdrawLimit = async (user: AccountResponse, amount: number) => {
  if (isNewDayCheck(user.lastWithdrawDate)) {
    await accountApi.resetWithdrawLimit(user.id);
  }

  const newLimit = user.withdrawLimit - amount;

  if (newLimit < 0) {
    throw new Error("WITHDRAW_LIMIT_EXCEEDED");
  }

  return newLimit;
};

/* ================== SERVICES ================== */

export async function depositMoney(value: DepositRequest) {
  const user = await accountApi.getAccountDetails(value.accountNumber);

  validateAccount(user, "ACCOUNT_NOT_FOUND");
  validateAmount(value.amount);
  validateStatus(user.status, "FRONZEN_ACCOUNT");

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

  validateAccount(user, "ACCOUNT_NOT_FOUND");
  validateAmount(value.amount);
  validateStatus(user.status, "FRONZEN_ACCOUNT");

  const newBalance = user.balance - value.amount;
  validateBalance(newBalance);

  const newLimit = await handleWithdrawLimit(user, value.amount);

  await accountApi.withdraw(newBalance, user.id, newLimit);

  await transactionApi.addTransaction({
    accountNumber: value.accountNumber,
    type: "Withdraw",
    amount: value.amount,
    transactionDate: new Date(),
    description: "Withdraw money",
  });
}

export async function transferMoney(value: TransferRequest) {
  if (value.sourceAccountNumber === value.destinationAccountNumber) {
    throw new Error("SAME_ACCOUNT");
  }

  const sourceUser = await accountApi.getAccountDetails(
    value.sourceAccountNumber,
  );

  validateAccount(sourceUser, "SOURCE_ACCOUNT_NOT_FOUND");
  validateAmount(value.amount);
  validateStatus(sourceUser.status, "FRONZEN_SOURCEACCOUNT");

  const newSourceBalance = sourceUser.balance - value.amount;
  validateBalance(newSourceBalance);

  const desUser = await accountApi.getAccountDetails(
    value.destinationAccountNumber,
  );

  validateAccount(desUser, "DESTINATION_ACCOUNT_NOT_FOUND");
  validateStatus(desUser.status, "FRONZEN_DESACCOUNT");

  const newLimit = await handleWithdrawLimit(sourceUser, value.amount);

  const newDesBalance = desUser.balance + value.amount;

  await accountApi.withdraw(newSourceBalance, sourceUser.id, newLimit);

  await accountApi.deposit(newDesBalance, desUser.id);

  await transactionApi.addTransaction({
    accountNumber: value.sourceAccountNumber,
    type: "Transfer",
    amount: value.amount,
    transactionDate: new Date(),
    description: value.description,
  });
}
