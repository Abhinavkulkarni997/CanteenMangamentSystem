import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  changePasswordSchema,
  type ChangePasswordForm,
} from "./ChangePasswordSchema";

import { changePassword } from "../../services/profile";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const ChangePassword = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: changePassword,

    onSuccess: () => {

      toast.success("Password changed successfully");

      navigate("/admin/profile");

    },

    onError: (error: any) => {

      toast.error(
        error.response?.data?.message ||
        "Failed to change password"
      );

    },
  });

  const onSubmit = (data: ChangePasswordForm) => {

    mutation.mutate(data);

  };

  return (

    <div className="max-w-lg mx-auto mt-10">

      <Card>

        <CardHeader>

          <CardTitle>
            Change Password
          </CardTitle>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>

              <Input
                type="password"
                placeholder="Old Password"
                {...register("oldPassword")}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.oldPassword?.message}
              </p>

            </div>

            <div>

              <Input
                type="password"
                placeholder="New Password"
                {...register("newPassword")}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword?.message}
              </p>

            </div>

            <div>

              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>

            </div>

            <Button type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>

  );

};

export default ChangePassword;