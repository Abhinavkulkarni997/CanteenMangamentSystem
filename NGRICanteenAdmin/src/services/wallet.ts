import api from "../services/api";

export const getWallet = async (userId: number) => {
  const res = await api.get(`/wallet/user/${userId}`);
  return res.data.data;
};

export const getWalletBalance = async (userId: number) => {
  const res = await api.get(`/wallet/user/${userId}/balance`);
  return res.data.data;
};

export const getWalletTransactions = async (
  userId: number,
  page = 1,
  limit = 10
) => {
  const res = await api.get(
    `/wallet/user/${userId}/transactions?page=${page}&limit=${limit}`
  );

  return res.data.data;
};

export const creditWallet = async (
  userId: number,
  data: {
    amount: number;
    remarks?: string;
    referenceId?: string;
  }
) => {
  const res = await api.post(`/wallet/${userId}/credit`, data);
  return res.data.data;
};

export const debitWallet = async (
  userId: number,
  data: {
    amount: number;
    remarks?: string;
  }
) => {
  const res = await api.post(`/wallet/${userId}/debit`, data);
  return res.data.data;
};