import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {

    to: string;

    title: string;

    icon: LucideIcon;

}

export default function SidebarItem({

    to,

    title,

    icon: Icon,

}: Props) {

    return (

        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                }`
            }
        >

            <Icon size={20} />

            <span>{title}</span>

        </NavLink>

    );

}