import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../services/user";

import PageHeader from "../../components/common/PageHeader";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import RoleBadge from "../../components/common/RoleBadge";
import UserStatusBadge from "../../components/common/UserStatusBadge";

export default function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(Number(id)),
    enabled: !!id,
  });

  const user = data?.data?.data;

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return <p className="p-6">User not found.</p>;
  }

  return (
    <div className="p-6">

      <PageHeader
        title="User Details"
        description="View user information"
      />

      <Card className="max-w-5xl mx-auto">

        <CardHeader className="flex flex-col items-center">

          <Avatar className="h-24 w-24">

            <AvatarImage
              src={
                user.photoUrl
                  ? `${import.meta.env.VITE_SERVER_URL}${user.photoUrl}`
                  : ""
              
              
                }
              
            />
            

           <AvatarFallback>
  {user.name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()}
</AvatarFallback>
          </Avatar>

          <CardTitle className="mt-4">
            {user.name}
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid grid-cols-2 gap-6">

            <InfoRow
  label="Employee / Project Staff ID"
  value={
    user.employeeId ||
    user.projectStaffId ||
    "-"
  }
/>

            <InfoRow
              label="Email"
              value={user.email}
            />

            <InfoRow
              label="Mobile"
              value={user.mobile}
            />

            <InfoRow
              label="Designation"
              value={user.designation}
            />

            <InfoRow
              label="Division"
              value={user.division}
            />

            <InfoRow
              label="Role"
              value={<RoleBadge role={user.role} />}
            />

            <InfoRow
              label="User Type"
              value={user.userType}
            />

            <InfoRow
              label="Status"
              value={
                <UserStatusBadge
                  active={user.isActive}
                />
              }
            />

            <InfoRow
              label="Created At"
              value={new Date(user.createdAt).toLocaleString()}
            />

            <InfoRow
              label="Updated At"
              value={new Date(user.updatedAt).toLocaleString()}
            />

          </div>

          <div className="flex justify-end gap-3 mt-8">

            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button
              onClick={() =>
                navigate(`/admin/users/${user.id}/edit`)
              }
            >
              Edit User
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <div className="mt-1 font-medium">
        {value || "-"}
      </div>
    </div>
  );
}