export interface LoginRequest {
  mobile: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    forcePasswordChange: boolean;
  };
}

export interface RegisterRequest {
  name: string;
  mobile: string;
  password: string;

  email?: string;

  employeeId?: string;
  projectStaffId?: string;

  designation?: string;

  division?: string;

  role?: string;

  userType:
    | "EMPLOYEE"
    | "PROJECT_STAFF"
    | "CONTRACT"
    | "STUDENT"
    | "INTERN"
    | "VISITOR";

  projectId?: string;

  collegeName?: string;

  guideName?: string;

  contractorName?: string;

  organization?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}