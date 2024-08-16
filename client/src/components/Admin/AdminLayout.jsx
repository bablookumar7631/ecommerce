import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import AsideDrawer from "./AsideDrawer";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <AsideDrawer/>
    </>
  );
};

export default AdminLayout;