import {useQuery} from "@tanstack/react-query";
import * as orderService from "../services/order.service";

export function useOrderDetails(orderId:number|null){
    return useQuery({
        queryKey:["order-details",orderId],
        queryFn:async ()=>{
            
            const res=await orderService.getOrderDetails(orderId!);

            return res.data.data;

        },
        enabled:!!orderId,
    })
}