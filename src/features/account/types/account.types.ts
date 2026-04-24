export interface AccountResponse {
    id: string;
    accountNumber: string;
    ownerName: string;
    balance: number;
    status: string;
    createdAt: Date;
}

export interface CreateAccountRequest {
    accountNumber: string;
    ownerName: string;
    balance: number;
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