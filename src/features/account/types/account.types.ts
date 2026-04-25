export interface AccountResponse {
  id: string;
  accountNumber: string;
  ownerName: string;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
  withdrawLimit: number;
  lastWithdrawDate: Date;
}

export interface CreateAccountRequest {
  accountNumber: string;
  ownerName: string;
  balance: number;
  withdrawLimit: number;
  createdAt: Date;
  lastWithdrawDate: Date;
  status: AccountStatus;
}

export interface DepositRequest {
  accountNumber: string;
  amount: number;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
}

export interface TransferRequest {
  sourceAccountNumber: string;
  destinationAccountNumber: string;
  amount: number;
  description: string;
}

export type AccountStatus = "Active" | "Frozen";
