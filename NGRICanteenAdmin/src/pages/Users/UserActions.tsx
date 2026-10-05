import { MoreHorizontal } from "lucide-react";
// import { Button } from "../../components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import ResetPasswordDialog from "./ResetPasswordDialog";
import UserStatusDialog from "./UserStatusDialog";

export default function UserActions({ user }: { user: User }) {
    const [resetOpen, setResetOpen] = useState(false);

const [statusOpen, setStatusOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <DropdownMenu>

      {/* <DropdownMenuTrigger >

        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

      </DropdownMenuTrigger> */}
      <DropdownMenuTrigger
  className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
  aria-label="User actions"
>
  <MoreHorizontal className="h-4 w-4" />
</DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem
          onClick={() =>
            navigate(`/admin/users/${user.id}`)
          }
        >
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            navigate(`/admin/users/${user.id}/edit`)
          }
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setResetOpen(true)}
>
          Reset Password
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setStatusOpen(true)}>
          {user.isActive
            ? "Deactivate"
            : "Activate"}
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
    <ResetPasswordDialog
    open={resetOpen}
    onOpenChange={setResetOpen}
    userId={user.id}
    userName={user.name}
  />

  <UserStatusDialog
    open={statusOpen}
    onOpenChange={setStatusOpen}
    user={user}
  />
  </>
  );
}