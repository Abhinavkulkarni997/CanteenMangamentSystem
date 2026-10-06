import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login/Login";
import Menu from "../pages/Menu/Menu";
import Orders from "../pages/Orders/Orders";
import Scanner from "../pages/Scanner/Scanner";
import Users from "../pages/Users/Users";
import Reports from "../pages/Reports/Reports";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/Profile/ChangePassword";
import AddUser from "../pages/Users/AddUser";
import EditUser from "../pages/Users/EditUser";
import ViewUser from "../pages/Users/ViewUser";
import AuditLogs from "../pages/Audit/AuditLogs";
import Wallet from "../pages/Wallet/Wallet";

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/canteen/admin">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="scanner" element={<Scanner />} />
       
          <Route path="reports" element={<Reports />} />

          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="users" element={<Users />} />
          <Route path="users/new" element={<AddUser />} />
          <Route path="users/:id" element={<ViewUser />} />
          <Route path="users/:id/edit" element={<EditUser />} />
          <Route path="audit" element={<AuditLogs />}/>
          <Route path="wallet" element={<Wallet />} />
  
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
