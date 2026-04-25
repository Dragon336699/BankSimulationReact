import { apiClient } from "../../../api/apiClient"
import type { AccountResponse, CreateAccountRequest } from "../types/account.types";

export const accountApi = {
    async getAllAccounts() {
        const res = await apiClient.get<AccountResponse[]>('accounts');
        return {
            data: res.data,
        };
    },
    async createAccount(data: CreateAccountRequest) {
        await apiClient.post('accounts', data);
    },
    async getAccountDetails(accountNumber: string) {
        const res = await apiClient.get<AccountResponse[]>(`accounts?accountNumber=${accountNumber}`);
        return res.data[0];
    },
    async deposit(newBalance: number, userId: string) {
        await apiClient.patch(`accounts/${userId}`, {balance: newBalance});
    },
    async withdraw(newBalance: number, userId: string, newWithdrawLimit: number) {
        await apiClient.patch(`accounts/${userId}`, {balance: newBalance, withdrawLimit: newWithdrawLimit});
    },
    async resetWithdrawLimit(userId: string) {
        await apiClient.patch(`accounts/${userId}`, {withdrawLimit: 500000, lastWithdrawDate: new Date()});
    },
    async transfer(sourceAccountId: string, destinationAccountId: string, sourceBalance: number, destinationBalance: number) {
        await apiClient.patch(`accounts/${sourceAccountId}`, {balance: sourceBalance});
        await apiClient.patch(`accounts/${destinationAccountId}`, {balance: destinationBalance});
    },
    async toggleStatus(account: AccountResponse) {
        await apiClient.patch(`accounts/${account.id}`, {status: account.status});
    },
}