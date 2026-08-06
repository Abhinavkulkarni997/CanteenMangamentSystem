import api from "./api";
import type {
  CreateUserRequest,
  GetUsersParams,
  ResetPasswordRequest,
  UpdateStatusRequest,
  UpdateUserRequest,
} from "../types/user";

export const getUsers = (params: GetUsersParams) =>
  api.get("/users", {
    params,
  });

export const getUser = (id: number) =>
  api.get(`/users/${id}`);

// export const createUser = (
//   data: CreateUserRequest
// ) =>
//   api.post("/users", data);
export const createUser = (
  data: FormData
) =>
  api.post("/users", data);

// export const updateUser = (
//   id: number,
//   data: UpdateUserRequest
// ) =>
//   api.put(`/users/${id}`, data);


  export const updateUser = (
  id: number,
  data: FormData
) =>
  api.put(`/users/${id}`, data);

export const updateUserStatus = (
  id: number,
  data: UpdateStatusRequest
) =>
  api.patch(`/users/${id}/status`, data);
  

export const resetPassword = (
  id: number,
  data: ResetPasswordRequest
) =>
  api.put(
    `/users/${id}/reset-password`,
    data
  );




export const searchUsers = async (search: string) => {
  const res = await api.get("/users", {
    params: {
      search,
      page: 1,
      limit: 10,
    },
  });

  return res.data.data.users;
};