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

    to: "/dashboard",

    icon: LayoutDashboard,
  },

  {
    title: "Menu",

    to: "/menu",

    icon: UtensilsCrossed,
  },

  {
    title: "Orders",

    to: "/orders",

    icon: ClipboardList,
  },

  {
    title: "QR Scanner",

    to: "/scanner",

    icon: QrCode,
  },

  {
    title: "Users",

    to: "/users",

    icon: Users,
  },
  {
  title: "Wallet",
to: "/wallet",
  icon: Wallet,

},

  {
    title: "Reports",

    to: "/reports",

    icon: ChartColumn,
  },
  {
    title: "Audit Logs",
    to: "/audit",
    icon: ShieldCheck,
  },
  
];
