export interface Wallet {
  id: number;
  balance: number;
}

export interface WalletBalance {
  balance: number;
}

export interface WalletTransaction {
  id: number;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "SUCCESS" | "FAILED";
  remarks: string;
  referenceId: string;
  createdAt: string;
  order?: {
    id: number;
    orderNumber: string;
  };
}

export interface WalletTransactionResponse {
  transactions: WalletTransaction[];
  total: number;
  page: number;
  pages: number;
}