import api from "./api";

export const getReports = (params?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  return api.get("/reports", {
    params,
  });
};

export const exportExcel = (params?: {
  startDate?: string;
  endDate?: string;
  search?: string;
  status?: string;
}) => {
  return api.get("/reports/excel", {
    params,
    responseType: "blob",
  });
};