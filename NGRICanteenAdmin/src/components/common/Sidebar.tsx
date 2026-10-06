import { navigation } from "../../constants/navigation";
import SidebarItem from "./SidebarItem";
import { LogOut,User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ngrilogo   from "../../assets/ngri-logo.png";
export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <aside className="fixed top-0 left-0 w-64  bg-slate-900 text-white h-screen p-4 flex flex-col shadow-xl z-50">
      <div className="text-xl font-semibold p-6 mb-10 flex justify-center items-center">
        <img src={ngrilogo} className="w-12 h-12" alt="ngri-logo"/>
        <h2 className=" whitespace-nowrap">CSIR-NGRI Canteen</h2>
        </div>

      <div className="flex-1 overflow-y-auto px-4 ">
        {navigation.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>
      <div className="border-t border-slate-700 p-4 space-y-2">
        <SidebarItem
    to="/profile"
    title="My Profile"
    icon={User}
  />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
