import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import UserForm from "./UserForm";

import { getUser, updateUser } from "../../services/user";

import type { UserFormValues } from "./user.schema";

export default function EditUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [photo, setPhoto] = useState<File | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(Number(id)),
    enabled: !!id,
  });

  const user = data?.data?.data;
  

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      
      updateUser(Number(id), formData),
    

    onSuccess: (response) => {
      toast.success(
        response.data.message || "User updated successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", id],
      });
      

      navigate("/admin/users");
    },

    
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update user"
      );
    },
    
  }
  
);

  const handleSubmit = (
    values: UserFormValues
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null
      ) {
        formData.append(key, String(value));
      }
    });

    if (photo) {
      formData.append("photo", photo);
    }

    mutate(formData);
  };

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return <p className="p-6">User not found.</p>;
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Edit User"
        description="Update user details"
      />

      <UserForm
        mode="edit"
        defaultValues={user}
        loading={isPending}
        onSubmit={handleSubmit}
        photo={photo}
        setPhoto={setPhoto}
      />
    </div>
  );
}