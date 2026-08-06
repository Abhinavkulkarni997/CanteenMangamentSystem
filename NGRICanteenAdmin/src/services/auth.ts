import api from "./api";
export interface LoginRequest{
    // mobile:string;
    email: string;
    password:string;
}

export const login=(data:LoginRequest) => {
    return api.post("/auth/login",data);
};
export const me=()=>{
    return api.get("/auth/me");
};