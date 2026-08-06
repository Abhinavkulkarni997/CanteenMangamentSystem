export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

// export type UserType =
//   | "SCIENTIST"
//   | "TECHNICAL_OFFICER"
//   | "PROJECT_STAFF"
//   | "CONTRACT"
//   | "STUDENT"
//   | "VISITOR";
export type UserType =
  | "EMPLOYEE"
  | "PROJECT_STAFF"
  | "STUDENT"
  | "CONTRACT"
  | "INTERN"
  | "VISITOR";

export interface User {
  id: number;
  name: string;
  email?: string | null;
  mobile: string;
  employeeId?: string | null;
  projectStaffId?: string | null;
  designation: string | null;
  division: string | null;
  role: Role;
  userType: UserType;
  isActive: boolean;
  photoUrl: string | null;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string | null;

  ordersCount?: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  userType?: string;
  isActive?: boolean;
}

export interface CreateUserRequest {
  name: string;
  mobile: string;
  password: string;
  employeeId?: string;
  projectStaffId?: string;
  designation?: string;
  division?: string;
  role: Role;
  userType: UserType;
}

export interface UpdateUserRequest {
  name: string;
  email?:string;
  mobile: string;
  employeeId?: string;
  projectStaffId?: string;
  designation?: string;
  division?: string;
  role?: Role;
  userType?: UserType;
}

export interface UpdateStatusRequest {
  isActive: boolean;
}

export interface ResetPasswordRequest {
  password: string;
  forcePasswordChange: boolean;
}
export interface SearchUser {
  id: number;
  name: string;
  employeeId?: string | null;
  projectStaffId?: string | null;
  mobile: string;
  photoUrl: string | null;
  role: string;
  userType: string;
}