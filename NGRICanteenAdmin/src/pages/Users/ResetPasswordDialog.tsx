import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Label } from "../../components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";

import {
  resetPasswordSchema,
  type ResetPasswordForm,
} from "../../pages/Users/resetPassword.schema";

import { resetPassword } from "../../services/user";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  userId: number;
  userName: string;
}

export default function ResetPasswordDialog({
  open,
  onOpenChange,
  userId,
  userName,
}: ResetPasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
      forcePasswordChange: true,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: ResetPasswordForm) =>
      resetPassword(userId, {
        password: values.password,
        forcePasswordChange: values.forcePasswordChange,
      }),

    onSuccess: (res) => {
      toast.success(res.data.message);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      reset({
        password: "",
        confirmPassword: "",
        forcePasswordChange: true,
      });

      onOpenChange(false);
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Failed to reset password");
    },
  });

  const onSubmit = (values: ResetPasswordForm) => {
    mutation.mutate(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          reset({
            password: "",
            confirmPassword: "",
            forcePasswordChange: true,
          });
          setShowPassword(false);

          setShowConfirmPassword(false);
        }
        onOpenChange(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>

          <DialogDescription>
            Reset the password for <strong>{userName}</strong>.
            <br />
            The user will need to use the new password on their next login.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Confirm Password */}

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <Controller
            control={control}
            name="forcePasswordChange"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />

                <Label>Force password change on next login</Label>
              </div>
            )}
          />

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
