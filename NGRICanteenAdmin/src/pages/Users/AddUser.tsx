import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import UserForm from "./UserForm";

import { createUser } from "../../services/user";
import type { UserFormValues } from "./user.schema";
import toast from "react-hot-toast";

export default function AddUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [photo, setPhoto] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,

    onSuccess: (respone) => {
      toast.success(respone.data.message || "User created successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      navigate("/admin/users");
    },

    onError: (error:any) => {
     toast.error(error?.response?.data?.message || "Failed to create user");
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    const formData = new FormData();

Object.entries(values).forEach(([key, value]) => {
  if (value !== undefined && value !== null) {
    formData.append(key, String(value));
  }
});

if (photo) {
  formData.append("photo", photo);
}
console.log(photo);

for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
mutate(formData);


    // mutate(values);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Add User"
        description="Create a new user"
      />

      <UserForm
        mode="create"
        loading={isPending}
        onSubmit={handleSubmit}
        photo={photo}
        setPhoto={setPhoto}
      />
    </div>
  );
}