import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { AdminInfoStore, UserLoginStore } from "../../../../Store";
import { NavLink } from "react-router-dom";
import { BASEURI } from "../../../../Context/SysConfs";
import Cookies from "js-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FeedIcon from "@mui/icons-material/Feed";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
export default function TopBar() {
  const [ProfileMenu, setProfileMenu] = useState(false);
  const adminData = AdminInfoStore((state) => state.adminData);
  const setuserRole = UserLoginStore((state) => state.setuserRole);
  const setuserRef = UserLoginStore((state) => state.setuserRef);
  const setempSOC = UserLoginStore((state) => state.setempSOC);
  const setisLoggedIn = UserLoginStore((state) => state.setisLoggedIn);
  const doLogout = () => {
    Cookies.remove("userRole");
    Cookies.remove("userRef");
    Cookies.remove("empSOC");
    Cookies.remove("loggedIn");
    setuserRole("");
    setuserRef("");
    setempSOC("");
    setisLoggedIn(false);
    window.location.href = BASEURI;
  };
  return (
    <Box display={"flex"} sx={{ my: 1 }} alignItems={"center"}>
      <Box flexGrow={1} paddingLeft={2}>
        <Typography variant="h6" color="initial">
          Welcome, {adminData.fullname}
        </Typography>
      </Box>
      <Tooltip title="Profile Menu">
        <IconButton onClick={() => setProfileMenu(true)} sx={{ p: 0 }}>
          <Avatar alt={adminData.fullname} src={adminData.profileimage} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={ProfileMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={ProfileMenu}
        onClose={() => setProfileMenu(false)}
      >
        <MenuItem onClick={() => setProfileMenu(false)}>
          <NavLink to="/admin/account" className="topMenu">
            <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
            Account
          </NavLink>
        </MenuItem>
        <MenuItem onClick={() => setProfileMenu(false)}>
          <NavLink to="/admin/healthinsurance" className="topMenu">
            <MedicalInformationIcon fontSize="small" sx={{ mr: 1 }} />
            Health Insurance
          </NavLink>
        </MenuItem>
        <MenuItem onClick={() => setProfileMenu(false)}>
          <NavLink to="/admin/tutorials" className="topMenu">
            <OndemandVideoIcon fontSize="small" sx={{ mr: 1 }} />
            Tutorials
          </NavLink>
        </MenuItem>
        <MenuItem onClick={() => setProfileMenu(false)}>
          <NavLink to="/admin/changelogs" className="topMenu">
            <FeedIcon fontSize="small" sx={{ mr: 1 }} /> What's New
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={doLogout}>
          <NavLink className="topMenu">
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </Box>
  );
}
