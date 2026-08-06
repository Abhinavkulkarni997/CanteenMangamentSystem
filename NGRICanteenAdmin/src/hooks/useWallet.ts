import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as walletService from "../services/wallet";

export const useWallet = (userId?: number) => {
  return useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => walletService.getWallet(userId!),
    enabled: !!userId,
  });
};

export const useWalletTransactions = (
  userId?: number,
  page = 1,
  limit = 10
) => {
  return useQuery({
    queryKey: ["wallet-transactions", userId, page, limit],
    queryFn: () =>
      walletService.getWalletTransactions(userId!, page, limit),
    enabled: !!userId,
  });
};

export const useCreditWallet = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      amount: number;
      remarks?: string;
    
    }) => walletService.creditWallet(userId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", userId] });
      queryClient.invalidateQueries({
        queryKey: ["wallet-transactions", userId],
      });
    },
  });
};

export const useDebitWallet = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      amount: number;
      remarks?: string;
    }) => walletService.debitWallet(userId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", userId] });
      queryClient.invalidateQueries({
        queryKey: ["wallet-transactions", userId],
      });
    },
  });
};