export interface TransactionResponse {
    id: string;
    accountNumber: string;
    type: string;
    amount: number;
    transactionDate: Date;
    description: string;
}

export type TransactionType = "Deposit" | "Withdrawal" | "Transfer";