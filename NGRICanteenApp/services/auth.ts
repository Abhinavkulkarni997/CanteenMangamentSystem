import api from "./api";
import { LoginRequest, RegisterRequest,ChangePasswordRequest } from "../types/auth";


export const login = (body: LoginRequest) => {
  return api.post("/auth/login", body);
};

export const getProfile = () => {
  return api.get("/auth/me");
};

export const register = (body: RegisterRequest) => {
  return api.post("/auth/register", body);
};

export const changePassword = (
  data: ChangePasswordRequest
) => {
  //   console.log("Sending");

  // console.log(data);
  return api.put(
    "/auth/profile/password",
    data
  );
};