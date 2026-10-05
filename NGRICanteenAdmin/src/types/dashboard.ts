import type {LatestOrder} from "./order";
export interface Dashboard {

    totalOrders: number;

    bookedOrders: number;

    collectedOrders: number;

    cancelledOrders: number;

    totalRevenue: number;

}

export interface DashboardMenuItem {
  id: number;
  itemName: string;
  sessionType: "BREAKFAST" | "LUNCH" | "DINNER";
}
export interface DashboardResponse {
  summary: Dashboard;
  latestOrders: LatestOrder[];
  mealStats: {
    BREAKFAST: number;
    LUNCH: number;
    DINNER: number;
  };
  weeklyRevenue: {
    day: string;
    revenue: number;
  }[];
  todayMenu: DashboardMenuItem[];
}