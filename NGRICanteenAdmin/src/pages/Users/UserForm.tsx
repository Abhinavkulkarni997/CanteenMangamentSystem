import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState,useEffect } from "react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { userSchema, type UserFormValues } from "./user.schema";

interface UserFormProps {
  mode: "create" | "edit";
   defaultValues?: Partial<UserFormValues> & {
    photoUrl?: string | null;
  };
  onSubmit: (values: UserFormValues) => void;
  loading?: boolean;
  photo: File | null;
   setPhoto: React.Dispatch<
    React.SetStateAction<File | null>
  >;
}

export default function UserForm({
  mode,
  defaultValues,
  onSubmit,
  loading = false,
  photo,
  setPhoto,
}: UserFormProps) {
  const navigate = useNavigate();


  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      employeeId: "",
      projectStaffId: "",
      designation: "",
      division: "",
      role: "USER",
      userType: "EMPLOYEE",
      password: "",
      confirmPassword: "",
      ...defaultValues,
    },
  });
//   useEffect(() => {
//   if (defaultValues) {
//     reset({
//       name: defaultValues.name ?? "",
//       email: defaultValues.email ?? "",
//       mobile: defaultValues.mobile ?? "",
//       employeeId: defaultValues.employeeId ?? "",
//       projectStaffId: defaultValues.projectStaffId ?? "",
//       designation: defaultValues.designation ?? "",
//       division: defaultValues.division ?? "",
//       role: defaultValues.role ?? "USER",
//       userType: defaultValues.userType ?? "EMPLOYEE",
//       password: "",
//       confirmPassword: "",
//     });
//   }
// }, [defaultValues, reset]);
useEffect(() => {
  if (defaultValues) {
    reset({
      name: defaultValues.name ?? "",
      email: defaultValues.email ?? "",
      mobile: defaultValues.mobile ?? "",
      employeeId: defaultValues.employeeId ?? "",
      projectStaffId: defaultValues.projectStaffId ?? "",
      designation: defaultValues.designation ?? "",
      division: defaultValues.division ?? "",
      role: defaultValues.role ?? "USER",
      userType: defaultValues.userType ?? "EMPLOYEE",
      password: "",
      confirmPassword: "",
    });
  }
}, [defaultValues, reset]);
useEffect(() => {
  if (watch("userType") === "EMPLOYEE") {
    setValue("projectStaffId", "");
  }

  if (watch("userType") === "PROJECT_STAFF") {
    setValue("employeeId", "");
  }
}, [watch("userType"), setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
  <label className="mb-2 block text-sm font-medium">
    Photo (Optional)
  </label>

  {mode === "edit" && defaultValues?.photoUrl && (
  <div className="mb-4">
    <img
      src={`${import.meta.env.VITE_SERVER_URL}${defaultValues.photoUrl}`}
      alt="User"
      className="h-24 w-24 rounded-full object-cover border"
    />
  </div>
)}

  <Input
    type="file"
    accept="image/*"
   
    onChange={(e) =>{
    const file = e.target.files?.[0] ?? null;
    console.log(file); // <-- add this
    setPhoto(file);

    }}
  />
</div>
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>

          <Input placeholder="Enter name" {...register("name")} />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
  <label className="mb-2 block text-sm font-medium">
    Email
  </label>

  <Input
    type="email"
    placeholder="name@ngri.res.in"
    {...register("email")}
  />

  {errors.email && (
    <p className="mt-1 text-sm text-red-500">
      {errors.email.message}
    </p>
  )}
</div>
        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm font-medium">Mobile</label>

          <Input placeholder="9876543210" {...register("mobile")} />

          {errors.mobile && (
            <p className="mt-1 text-sm text-red-500">{errors.mobile.message}</p>
          )}
        </div>

        {/* Employee ID */}
        {/* <div>
          <label className="mb-2 block text-sm font-medium">Employee ID</label>

          <Input placeholder="Employee ID" {...register("employeeId")} />
        </div> */}

         {/* Project Staff ID */}
        {/* <div> 
          <label className="mb-2 block text-sm font-medium"> Project Staff ID</label>
          <Input placeholder="Project Staff ID" {...register("projectStaffId")} />
        </div> */}

        {watch("userType") === "EMPLOYEE" && (
  <div>
    <label className="mb-2 block text-sm font-medium">
      Employee ID
    </label>

    <Input
      placeholder="Employee ID"
      {...register("employeeId")}
    />
  </div>
)}

{watch("userType") === "PROJECT_STAFF" && (
  <div>
    <label className="mb-2 block text-sm font-medium">
      Project Staff ID
    </label>

    <Input
      placeholder="Project Staff ID"
      {...register("projectStaffId")}
    />
  </div>
)}

        {/* Designation */}
        <div>
          <label className="mb-2 block text-sm font-medium">Designation</label>

          <Input placeholder="Designation" {...register("designation")} />
        </div>

        {/* Division */}
        <div>
          <label className="mb-2 block text-sm font-medium">Division</label>

          <Input placeholder="Division" {...register("division")} />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium">Role</label>

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>

                  <SelectItem value="ADMIN">Admin</SelectItem>

                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* User Type */}
        <div>
          <label className="mb-2 block text-sm font-medium">User Type</label>

          <Controller
            control={control}
            name="userType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select User Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>

                  {/* <SelectItem value="SCIENTIST">Scientist</SelectItem> */}

                  <SelectItem value="PROJECT_STAFF">Project Staff</SelectItem>

                   <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                   <SelectItem value="INTERN">Intern</SelectItem>
                    <SelectItem value="VISITOR">Visitor</SelectItem>

                  {/* <SelectItem value="GUEST">Guest</SelectItem> */}
                </SelectContent>
                {/* <SelectContent>
  <SelectItem value="SCIENTIST">
    Scientist
  </SelectItem>

  <SelectItem value="PROJECT_STAFF">
    Project Staff
  </SelectItem>

  <SelectItem value="CONTRACT_STAFF">
    Contract Staff
  </SelectItem>

  <SelectItem value="INTERNSHIP_STUDENT">
    Internship Student
  </SelectItem>
</SelectContent> */}
              </Select>
            )}
          />

          {errors.userType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.userType.message}
            </p>
          )}
        </div>
      </div>

      {mode === "create" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <Input
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <Input
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create User"
              : "Update User"}
        </Button>
      </div>
    </form>
  );
}
