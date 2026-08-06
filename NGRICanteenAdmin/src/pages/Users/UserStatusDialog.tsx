import type { User } from "../../types/user";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { updateUserStatus } from "../../services/user";


interface UserStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export default function UserStatusDialog({ open, onOpenChange,user }:UserStatusDialogProps){
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: () =>
    updateUserStatus(user.id, {
      isActive: !user.isActive,
    }),

  onSuccess: (res) => {
    toast.success(res.data.message);

    queryClient.invalidateQueries({
      queryKey: ["users"],
    });

    onOpenChange(false);
  },

  onError: (err: any) => {
    toast.error(
      err.response?.data?.message ??
        "Failed to update user status"
    );
  },
});
return(
    <Dialog
  open={open}
  onOpenChange={onOpenChange}
>
  <DialogContent>

    <DialogHeader>

      <DialogTitle>
        {user.isActive
          ? "Deactivate User"
          : "Activate User"}
      </DialogTitle>

      <DialogDescription>
        {user.isActive
          ? `Are you sure you want to deactivate ${user.name}?`
          : `Are you sure you want to activate ${user.name}?`}
      </DialogDescription>

    </DialogHeader>

    <DialogFooter>

      <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>

      <Button
        variant={
          user.isActive
            ? "destructive"
            : "default"
        }
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending
          ? "Saving..."
          : user.isActive
          ? "Deactivate"
          : "Activate"}
      </Button>

    </DialogFooter>

  </DialogContent>
</Dialog>
)
}



