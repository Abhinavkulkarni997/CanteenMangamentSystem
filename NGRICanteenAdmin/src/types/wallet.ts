export interface WalletUser {
  id: number;
  name: string;
  employeeId?: string | null;
  projectStaffId?: string | null;
  mobile: string;
}

export interface Wallet {
  id: number;
  userId: number;
  balance: string;
  createdAt: string;
  updatedAt: string;
  user: WalletUser;
}

export interface WalletTransaction {
  id: number;
  amount: string;
  type: "CREDIT" | "DEBIT" | "REFUND";
  status: "SUCCESS" | "FAILED" | "PENDING";
  remarks?: string;
  referenceId?: string;
  createdAt: string;

  admin?: {
    id: number;
    name: string;
  };

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