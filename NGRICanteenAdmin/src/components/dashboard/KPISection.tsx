import { ShoppingCart, IndianRupee, Clock3, CheckCircle } from "lucide-react";

import DashboardCard from "./DashboardCard";

import type { Dashboard } from "../../types/dashboard";

interface Props {
  dashboard?: Dashboard;
}

export default function KPISection({ dashboard }: Props) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <DashboardCard
        title="Today's Orders"
        value={dashboard?.totalOrders ?? 0}
        icon={ShoppingCart}
        color="bg-cyan-600"
      />

      <DashboardCard
        title="Revenue"
        value={`₹${dashboard?.totalRevenue ?? 0}`}
        icon={IndianRupee}
        color="bg-green-600"
      />

      <DashboardCard
        title="Collected"
        value={dashboard?.collectedOrders ?? 0}
        icon={CheckCircle}
        color="bg-blue-600"
      />

      <DashboardCard
        title="Booked"
        value={dashboard?.bookedOrders ?? 0}
        icon={Clock3}
        color="bg-orange-500"
      />
    </div>
  );
}
