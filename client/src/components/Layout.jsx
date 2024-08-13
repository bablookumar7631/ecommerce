import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const settings = ["Profile", "Dashboard", "Logout"];

const Layout = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user } = useSelector((store) => store.auth);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <nav className="bg-gray-200 p-2 px-10 sticky top-0 left-0 shadow-md z-50">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <img
              src="./images/ecommerce.png"
              alt="website-logo"
              className="w-12 h-12"
            />
          </Link>

          <div className="relative w-[35%]">
            {/* Search Icon */}
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {/* Input Field */}
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              className="bg-white pl-10 pr-3 py-2 w-full rounded-lg outline-none"
            />
          </div>

          <ul className="flex items-center gap-6 md:text-[17px]">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/product"}>Product</Link>
            </li>
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
                      alt={user.firstName.charAt(0)}
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: 35, height: 35, bgcolor: blue[300] }}
                    >
                      {!user.image && user.firstName.charAt(0)}
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </ul>
        </div>
      </nav>

      <div>{children}</div>

      <footer className="bg-blue-100">
        <div className="w-10/12 mx-auto grid md:grid-cols-4 md:gap-16 gap-8 py-8">
          <div className="flex flex-col items-center">
            <Link to={"/"}>
              <img
                src="./images/ecommerce.png"
                alt="website-logo"
                className="w-16 h-16"
              />
            </Link>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, earum
              commodi praesentium ex amet sed dolorem exercitationem ipsa atque!
              Quam
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-3">Website Links</h1>
            <ul className="flex flex-col">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/product"}>Product</Link>
              </li>

              <li>
                <Link to={"sign-in"}>SignIn</Link>
              </li>
              <li>
                <Link to={"sign-up"}>SignUp</Link>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-3">Follow us</h1>
            <ul>
              <li>
                <Link to="/">Facebook</Link>
              </li>
              <li>
                <Link to="/">Youtube</Link>
              </li>
              <li>
                <Link to="/">Twitter</Link>
              </li>
              <li>
                <Link to="/">Linkedin</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-3">Contact us</h1>
            <form className="space-y-4">
              <input
                required
                name="fullname"
                className="bg-white w-full rounded p-2"
                placeholder="Your name"
              />

              <input
                required
                type="email"
                name="email"
                className="bg-white w-full rounded p-2"
                placeholder="Enter email id"
              />

              <textarea
                required
                name="message"
                className="bg-white w-full rounded p-2"
                placeholder="Message"
                rows={3}
              />

              <button className="bg-blue-950 text-white py-2 px-6 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
