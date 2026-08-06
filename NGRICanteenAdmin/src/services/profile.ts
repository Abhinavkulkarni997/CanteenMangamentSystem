import api from "./api";

export const getProfile = () =>
    api.get("/auth/me");

export const changePassword = (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}) =>
    api.put("/auth/profile/password", data);