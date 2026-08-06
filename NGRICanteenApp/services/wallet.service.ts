import api from "./api";

export const getMyWallet = () =>
  api.get("/wallet/me");

export const getMyWalletBalance = () =>
  api.get("/wallet/me/balance");

export const getMyWalletTransactions = (
  page = 1,
  limit = 10
) =>
  api.get(
    `/wallet/me/transactions?page=${page}&limit=${limit}`
  );

  export const getWalletData = async () => {
  const [wallet, transactions] = await Promise.all([
    getMyWallet(),
    getMyWalletTransactions(),
  ]);

  return {
    wallet: wallet.data.data,
    transactions: transactions.data.data.transactions,
  };
};