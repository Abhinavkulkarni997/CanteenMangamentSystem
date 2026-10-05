import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z
  .string()
  .email("Invalid email")
  .optional()
  .or(z.literal("")),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),

  password: z.string().min(6),

  employeeId: z.string().optional(),
  projectStaffId: z.string().optional(),

  // designation: z.string().min(2),

  // division: z.string().min(2),

  designation: z.string().optional(),

division: z.string().optional(),

  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]),

  // userType: z.enum([
  //   "SCIENTIST",
  //   "PROJECT_STAFF",
  //   "CONTRACT_EMPLOYEE",
  //   "STUDENT",
  //   "VISITOR",
  // ]),
   userType: z.enum([
     "EMPLOYEE",
      "PROJECT_STAFF",
      "STUDENT",
      "CONTRACT",
      "INTERN",
      "VISITOR"
  ]),

  photoUrl: z.string().optional(),
}) .superRefine((data, ctx) => {
    if (
      data.userType === "EMPLOYEE" &&
      !data.employeeId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["employeeId"],
        message: "Employee ID is required",
      });
    }

    if (
      data.userType === "PROJECT_STAFF" &&
      !data.projectStaffId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["projectStaffId"],
        message: "Project Staff ID is required",
      });
    }
  });


export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
   email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/)
    .optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),

  employeeId: z.string().optional(),
  projectStaffId: z.string().optional(),

  // designation: z.string().min(2).optional(),

  // division: z.string().min(2).optional(),
  designation: z.string().optional(),

division: z.string().optional(),

  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]).optional(),

  // userType: z.enum([
  //   "SCIENTIST",
  //   "PROJECT_STAFF",
  //   "CONTRACT_EMPLOYEE",
  //   "STUDENT",
  //   "VISITOR",
  // ]).optional(),
    userType: z.enum([
     "EMPLOYEE",
      "PROJECT_STAFF",
      "STUDENT",
      "CONTRACT",
      "INTERN",
      "VISITOR",
  ]).optional(),

  photoUrl: z.string().optional(),
}) .superRefine((data, ctx) => {
    if (
      data.userType === "EMPLOYEE" &&
      !data.employeeId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["employeeId"],
        message: "Employee ID is required",
      });
    }

    if (
      data.userType === "PROJECT_STAFF" &&
      !data.projectStaffId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["projectStaffId"],
        message: "Project Staff ID is required",
      });
    }
  });




export const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});


export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8)
    .max(100),

  forcePasswordChange:
    z.boolean().default(true),
});


export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, "Old password is required"),

 newPassword: z
  .string()
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
    "Password must contain uppercase, lowercase, number and special character."
  ),

  confirmPassword: z.string()

}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);