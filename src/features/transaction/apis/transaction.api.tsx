import { apiClient } from "../../../api/apiClient";
import type { TransactionResponse } from "../types/transaction.types";

export const transactionApi = {
    async getAllTransactions() {
        const res = await apiClient.get<TransactionResponse[]>(`transactions`);
        return {
            data: res.data
        }
    }
}