import { Badge } from "../ui/badge";

interface Props {
  active: boolean;
}

export default function UserStatusBadge({
  active,
}: Props) {
  return (
    <Badge
      variant={active ? "default" : "destructive"}
    >
      {active ? "Active" : "Inactive"}
    </Badge>
  );
}