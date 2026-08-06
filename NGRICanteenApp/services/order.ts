import api from "./api";
export const createOrder=(items:any[])=>{
    return api.post("/orders",{
        items
    });
};

export const getMyOrders=()=>{
    return api.get("/orders/my-orders");
};

export const getOrderDetails=(id:number)=>{
    return api.get(`/orders/${id}`);
}