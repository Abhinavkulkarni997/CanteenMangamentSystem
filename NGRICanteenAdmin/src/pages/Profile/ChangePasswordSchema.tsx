import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),

    newPassword: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordForm = z.infer<
  typeof changePasswordSchema
>;