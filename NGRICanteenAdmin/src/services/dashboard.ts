import api from "./api";
export const getDashboard=()=>{
    return api.get("/admin/dashboard");

}
export const getLatestOrders=()=>{
    return api.get("/admin/latest-orders")
}