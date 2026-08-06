import {type ColumnDef } from "@tanstack/react-table";
import { type User } from "../../types/user";

import UserStatusBadge from "../../components/common/UserStatusBadge";
import RoleBadge from "../../components/common/RoleBadge";
import UserActions from "./UserActions";


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "employeeId",

    header: "Employee / Project Staff ID",

    cell: ({ row }) =>
        row.original.employeeId ||
        row.original.projectStaffId ||
        "-",
},
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "division",
    header: "Division",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <RoleBadge role={row.original.role} />
    ),
  },
  {
    accessorKey: "userType",
    header: "User Type",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <UserStatusBadge
        active={row.original.isActive}
      />
    ),
  },
  {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => (
    <UserActions user={row.original} />
  ),
},
];
