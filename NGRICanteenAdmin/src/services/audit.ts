import api from "../services/api";

export const getAuditLogs = (params: {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  adminId?: number;
}) => {
  return api.get("/audit", {
    params,
  });
};