import api from "./api";
import type {OrdersResponse} from "../types/order";
export const getOrders=(params?:{
    page?:number;
    limit?:number;
    search?:string;
    status?:string;
})=>{
    return api.get<{
        success:boolean;
        data:OrdersResponse;
    }>("/orders",{
        params
    });
}
export const getOrderDetails=(id:number)=>{

    return api.get(`/orders/${id}`);

};

export const collectOrder = (id: number) => {

    return api.patch(`/orders/${id}/collect`);

};