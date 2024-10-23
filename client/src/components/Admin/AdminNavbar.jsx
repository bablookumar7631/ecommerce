import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import axios from "axios";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import AsideDrawer from "../Admin/AsideDrawer";
import Button from '@mui/material/Button';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle the logout process
  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://ecommerce-backend-bv1o.onrender.com/api/v1/users/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div>
      <nav className="bg-gray-200 p-2 px-10 sticky top-0 left-0 shadow-md z-50">
        <div className="flex justify-between items-center">
          <AsideDrawer>
            <FormatIndentIncreaseIcon />
          </AsideDrawer>

          <div className="text-blue-500 font-medium text-xl">
            Admin Panel
          </div>

          <Button sx={{px:'15px'}} variant="outlined" onClick={logoutHandler}>Logout</Button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;

