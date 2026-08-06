import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  QrCode,
  Users,
  ChartColumn,
  ShieldCheck,
  Wallet
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",

    to: "/admin/dashboard",

    icon: LayoutDashboard,
  },

  {
    title: "Menu",

    to: "/admin/menu",

    icon: UtensilsCrossed,
  },

  {
    title: "Orders",

    to: "/admin/orders",

    icon: ClipboardList,
  },

  {
    title: "QR Scanner",

    to: "/admin/scanner",

    icon: QrCode,
  },

  {
    title: "Users",

    to: "/admin/users",

    icon: Users,
  },
  {
  title: "Wallet",
to: "/admin/wallet",
  icon: Wallet,

},

  {
    title: "Reports",

    to: "/admin/reports",

    icon: ChartColumn,
  },
  {
    title: "Audit Logs",
    to: "/admin/audit",
    icon: ShieldCheck,
  },
  
];
