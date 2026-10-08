import KPISection from "../../components/dashboard/KPISection";
import LatestOrders from  "../../components/dashboard/LatestOrders";

import { useDashboard } from "../../hooks/useDashboard";

import MealStats from "../../components/dashboard/MealStats";
import RevenueChart from "../../components/dashboard/RevenueChart";
import PageContainer from "../../components/common/PageContainer";
import TodayMenu from "../../components/dashboard/TodayMenu";

const Dashboard = () => {
const  {data,loading}=useDashboard();
// console.log("Dashboard Data:", data);
// console.log("Loading:", loading);
if(loading || !data){
 return (
  <div className="flex h-96 items-center justify-center">
    Loading Dashboard...
  </div>
);
}

  return (
    <PageContainer title="Dashboard" description="Welcome to the CSIR-NGRI Canteen Admin Dashboard and Overview of today's canteen activities">
    
      <KPISection dashboard={data.summary}/>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="col-span-2">
          
    <RevenueChart data={data.weeklyRevenue}/>
    </div>

             <MealStats  data={data.mealStats}/>
             <div className="col-span-2">
            <LatestOrders orders={data.latestOrders} />
         

        </div>

       

    </div>

       <TodayMenu
  menu={data.todayMenu}
/>
      
      </PageContainer>
      
  );
}

export default Dashboard;
