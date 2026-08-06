import { useQuery } from "@tanstack/react-query";

import * as auditService from "../services/audit";

export function useAuditLogs(params: {
  page: number;
  limit: number;
  search: string;
  startDate: string;
  endDate: string;
  adminId?: number;
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["audit", params],

    queryFn: async () => {
      const response =
        await auditService.getAuditLogs(params);

      return response.data.data;
    },
  });

  return {
    data,
    loading: isLoading,
    refresh: refetch,
  };
}