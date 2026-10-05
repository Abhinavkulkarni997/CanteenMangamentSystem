import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z
  .string()
  .email("Invalid email")
  .optional()
  .or(z.literal("")),

    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
      gender: z
  .enum(["MALE", "FEMALE", "OTHER"]),
  // .refine((value) => value !== "", "Please select gender"),

    employeeId: z.string().optional(),
    projectStaffId: z.string().optional(),

    designation: z.string().optional(),

    division: z.string().optional(),

    role: z.enum([
      "SUPER_ADMIN",
      "ADMIN",
      "USER",
    ]),

    userType: z.enum([
      "EMPLOYEE",
      "PROJECT_STAFF",
      "STUDENT",
      "CONTRACT",
      "INTERN",
      "VISITOR",
      // "GUEST",
    ]),
//     z.enum([
//   "SCIENTIST",

//   "PROJECT_STAFF",
//   "CONTRACT_STAFF",
//   "INTERNSHIP_STUDENT",
// ]),

    password: z.string().optional(),

    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword)
        return true;

      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type UserFormValues = z.infer<
  typeof userSchema
>;