import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profile";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Skeleton } from "../../components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const profile = data?.data?.data;

if (!profile) {
  return (
    <div className="p-6">
      Loading profile...
    </div>
  );
}

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6">

      <Card>

        <CardHeader>

          <CardTitle className="text-2xl">
            My Profile
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="flex gap-8">

            <Avatar className="h-28 w-28">

              <AvatarImage src={profile.photoUrl} />

              <AvatarFallback>
                {profile.name?.charAt(0)}
              </AvatarFallback>

            </Avatar>

            <div className="grid grid-cols-2 gap-6 flex-1">

              <Info label="Name" value={profile.name} />

              <Info label="Email" value={profile.email} />

              <Info label="Mobile" value={profile.mobile} />

              <Info label="Employee ID" value={profile.employeeId} />

              <Info label="Designation" value={profile.designation} />

              <Info label="Division" value={profile.division} />

              <Info label="Role" value={profile.role} />

              <Info label="User Type" value={profile.userType} />

            </div>

          </div>

          <div className="mt-8 flex gap-4">

            <Button
              onClick={() =>
                navigate("/admin/change-password")
              }
            >
              Change Password
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
};

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-medium mt-1">
        {value || "-"}
      </p>

    </div>
  );
}

export default Profile;