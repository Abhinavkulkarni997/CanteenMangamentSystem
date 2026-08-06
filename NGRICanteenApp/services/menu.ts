import api from "./api";

export const getTodayMenu=()=>{

    return api.get("/menu-items/today");

};