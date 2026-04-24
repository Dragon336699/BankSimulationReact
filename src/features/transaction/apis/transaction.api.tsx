import { apiClient } from "../../../api/apiClient";
import type {
  CreateTransactionRequest,
  TransactionResponse,
} from "../types/transaction.types";

export const transactionApi = {
  async getAllTransactions() {
    const res = await apiClient.get<TransactionResponse[]>(`transactions`);
    return {
      data: res.data,
    };
  },

  async getTransactionsByAccountNumber(accountNumber: string) {
    const { data } = await apiClient.get<TransactionResponse[]>(
      `transactions?accountNumber=${accountNumber}`,
    );

    return data;
  },

  async addTransaction(value: CreateTransactionRequest) {
    await apiClient.post("transactions", value);
  },
};
