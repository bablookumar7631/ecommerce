import React from "react";
import { Outlet } from "react-router-dom";
import AsideDrawer from "./AsideDrawer";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar/>
      <div>
        <Outlet />
      </div>
      <AsideDrawer/>
    </>
  );
};

export default AdminLayout;