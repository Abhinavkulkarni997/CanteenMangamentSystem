// import { useEffect, useState } from "react";

// import * as dashboardService from "../services/dashboard";
// import {useQuery} from "@tanstack/react-query";

// // import type { Dashboard } from "../types/dashboard";
// // import type { LatestOrder } from "../types/order";


// export function useDashboard(){

//     const { data ,isLoading,refetch} = useQuery({
//   queryKey: ["dashboard"],
//   queryFn: async()=>{
//     const response=await dashboardService.getDashboard();
//     return response.data.data;
//   },
// });
// return{
//     data,
//     loading:isLoading,
//     refresh:refetch,
// }
    
//     //  const [dashboard, setDashboard] =
//     //     useState<Dashboard>();

//     // const [orders, setOrders] =
//     //     useState<LatestOrder[]>([]);

//     // const [loading, setLoading] =
//     //     useState(true);

//     // useEffect(() => {

//     //     loadDashboard();

//     // }, []);
//      const loadDashboard=async()=>{
//         try{
    
//             const [
    
//                 dashboardResponse,
    
//                 latestResponse
    
//             ]=await Promise.all([
    
//                 dashboardService.getDashboard(),
    
//                 dashboardService.getLatestOrders()
    
//             ]);
//             // console.log("Dashboard:", dashboardResponse);
//             // console.log("Latest Orders:", latestResponse);
//             setDashboard(
    
//                 dashboardResponse.data.data
    
//             );
    
//             setOrders(
    
//                 latestResponse.data.data
    
//             );
    
//         }finally{
//           setLoading(false);
//         }
//       };
//       return{
//         dashboard,
//         orders,
//         loading,
//         refresh:loadDashboard
//       };

// }
import { useQuery } from "@tanstack/react-query";
import * as dashboardService from "../services/dashboard";

export function useDashboard() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await dashboardService.getDashboard();
      return response.data.data;
    },
  });

  return {
    data,
    loading: isLoading,
    refresh: refetch,
  };
}