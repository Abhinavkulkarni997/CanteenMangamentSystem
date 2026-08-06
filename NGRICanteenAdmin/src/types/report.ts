import type { Dashboard } from "./dashboard";
import type { LatestOrder } from "./order";

export interface RevenueItem {
  day: string;
  revenue: number;
}

export interface MealReport {
  BREAKFAST: number;
  LUNCH: number;
  DINNER: number;
}

export interface OrdersResponse {
  orders: LatestOrder[];
  total: number;
  page: number;
  pages: number;
}

export interface ReportsResponse {
  summary: Dashboard;
  revenue: RevenueItem[];
  meals: MealReport;
  orders: OrdersResponse;
}