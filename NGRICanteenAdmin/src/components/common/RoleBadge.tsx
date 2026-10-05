// import { Badge } from "../../components/ui/badge";

interface Props {
  role: string;
}

export default function RoleBadge({
  role,
}: Props) {

  const variants: Record<string, string> = {
    SUPER_ADMIN: "bg-red-100 text-red-700",
    ADMIN: "bg-blue-100 text-blue-700",
    USER: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        variants[role] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {role.replace("_", " ")}
    </span>
  );
}