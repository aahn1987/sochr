import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  colors,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyExchangeTwoToneIcon from "@mui/icons-material/CurrencyExchangeTwoTone";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { NavLink } from "react-router-dom";
import { AdminInfoStore, UserLoginStore } from "../../../../Store";
import { Img } from "react-image";
import { CircleLoader } from "../../Loaders/";
import LOGO from "../../../../Assets/IMG/logo.png";
const drawerWidth = 240;
export default function Navigation() {
  const adminData = AdminInfoStore((state) => state.adminData);
  const SetYear = new Date().getFullYear();
  return (
    <Box
      sx={{
        marginTop: "10px",
        marginLeft: "10px",
        height: "calc(100% - 20px)",
        width: drawerWidth,
        borderRadius: 3,
        boxShadow: 4,
        overflow: "hidden",
        backgroundColor: "#fff",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: 64, p: 2 }}>
        <Img className="barImg" src={LOGO} loader={<CircleLoader />} />
      </Box>
      <Box flexGrow={1}>
        <NavLink className="navlink" to="/admin/dashboard" title="Dashboard">
          <SpeedIcon fontSize="small" sx={{ mx: 1 }} />
          <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
            Dashboard
          </Typography>
          <ChevronRightOutlinedIcon
            fontSize="small"
            sx={{ alignSelf: "flex-end" }}
          />
        </NavLink>
        {adminData.manage_staff && (
          <NavLink
            className="navlink"
            to="/admin/socstaff"
            title="Manage Admins"
          >
            <AdminPanelSettingsOutlinedIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Manage Admins
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_iom && (
          <NavLink className="navlink" to="/admin/iomhr" title="Manage IOM HR">
            <PeopleAltTwoToneIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Manage IOM HR
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_employees && (
          <NavLink
            className="navlink"
            to="/admin/employees"
            title="Manage Employees"
          >
            <PeopleIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Manage Employees
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_payroll && (
          <NavLink
            className="navlink"
            to="/admin/payroll"
            title="Manage Payroll"
          >
            <CurrencyExchangeTwoToneIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Manage Payroll
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_leaves && (
          <NavLink className="navlink" to="/admin/leaves" title="Manage Leaves">
            <MessageOutlinedIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Manage Leaves
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_evalutions && (
          <NavLink
            className="navlink"
            to="/admin/evaluations"
            title="Manage Evaluations"
          >
            <StarTwoToneIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Manage Evaluations
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_sysconfig && (
          <NavLink
            className="navlink"
            to="/admin/configuration"
            title="System Configurations"
          >
            <SettingsSuggestTwoToneIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              System Configurations
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
        {adminData.manage_sysconfig && (
          <NavLink className="navlink" to="/admin/logs" title="Admin Logs">
            <ListAltTwoToneIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography sx={{ flexGrow: 1, fontSize: "12px" }}>
              Admin Logs
            </Typography>
            <ChevronRightOutlinedIcon
              fontSize="small"
              sx={{ alignSelf: "flex-end" }}
            />
          </NavLink>
        )}
      </Box>
      <Box
        textAlign={"center"}
        padding={1}
        backgroundColor={colors.grey[900]}
        className="textcolorwhite"
        fontSize={"9px"}
      >
        © Copyright Stars Orbit {SetYear}.<br />
        Powered By{" "}
        <a
          href="https://minassa.tech"
          target="_blanck"
          className="alllink textcolorwhite"
        >
          Minassa Solutions.
        </a>
      </Box>
    </Box>
  );
}
