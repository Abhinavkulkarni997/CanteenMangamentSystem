import { useQuery } from "@tanstack/react-query";
import * as reportService from "../services/report";

export function useReports(params?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reports", params],
    queryFn: async () => {
      const response = await reportService.getReports(params);
      return response.data.data;
    },
  });

  return {
    data,
    loading: isLoading,
    refresh: refetch,
  };
}