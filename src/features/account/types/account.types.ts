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