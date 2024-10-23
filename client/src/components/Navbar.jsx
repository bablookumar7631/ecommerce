import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../redux/authSlice";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import axios from "axios";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import AsideDrawer from "./Admin/AsideDrawer";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { showNotification } from "../redux/notificationSlice";

const settings = [
  {
    icon : <PersonIcon/>,
    name : "Profile"
  },
  {
    icon : <ShoppingBagIcon/>,
    name : "Orders"
  },
  {
    icon : <LogoutIcon/>,
    name : "Logout"
  }
]


const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { totalQuantity } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        navigate(`/search?q=${query}`);
      }
    }
  };

  const handleCartClick = (e) => {
    if(totalQuantity === 0){
      e.preventDefault();
      dispatch(showNotification('Your cart is empty!'));
    }else{
      navigate("/cart");
    }
  }

  return (
    <div>
      <nav className="bg-gray-200 p-2 px-10 sticky top-0 left-0 shadow-md z-50">
        <div className="flex justify-between items-center">
          {isAdminRoute ? (
            <AsideDrawer>
              <FormatIndentIncreaseIcon />
            </AsideDrawer>
          ) : (
            <Link to={"/"}>
              <img
                src="./images/ecommerce.png"
                alt="website-logo"
                className="w-12 h-12"
              />
            </Link>
          )}

          <div className="relative w-[35%]">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              className="bg-white pl-10 pr-3 py-2 w-full rounded-lg outline-none"
              onKeyPress={handleSearch}
            />
          </div>

          <ul className="flex items-center gap-6 md:text-[17px]">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/product"}>Product</Link>
            </li>
            <Badge 
              badgeContent={totalQuantity || 0} 
              color="primary" 
              showZero 
              sx={{ paddingLeft: '14px', cursor: 'pointer' }}
              onClick={handleCartClick}
            >
              <ShoppingCartIcon sx={{ fontSize: 26 }} color="action" />
            </Badge>
            {!user ? (
              <>
                <li>
                  <Link to={"sign-in"}>
                    <Button variant="outlined">SignIn</Button>
                  </Link>
                </li>
                <li>
                  <Link to={"sign-up"}>
                    <Button variant="contained">SignUp</Button>
                  </Link>
                </li>
              </>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src={user.profilePhoto || '/broken-image.jpg'}
                    sx={{ width: 35, height: 35, bgcolor: blue[300] }}
                  >
                    {!user.profilePhoto && (user.firstName ? user.firstName.charAt(0) : '')}
                  </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      sx={{ px: "25px" }}
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.name === "Logout") {
                          logoutHandler();
                        } else if (setting.name === "Profile") {
                          navigate("/user-profile");
                        } else {
                          navigate("/user-orders");
                        }
                      }}
                    >
                      <ListItemIcon sx={{pr: "15px"}}>
                        {setting.icon}
                      </ListItemIcon>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
