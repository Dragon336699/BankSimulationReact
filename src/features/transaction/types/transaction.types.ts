export interface TransactionResponse {
    id: string;
    accountNumber: string;
    type: TransactionType;
    amount: number;
    transactionDate: Date;
    description: string;
}

export interface CreateTransactionRequest {
    accountNumber: string;
    type: TransactionType;
    amount: number;
    transactionDate: Date;
    description?: string;
}

export type TransactionType = "Deposit" | "Withdraw" | "Transfer";