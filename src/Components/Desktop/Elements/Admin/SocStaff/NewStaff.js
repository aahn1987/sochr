import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  colors,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { useEffect, useState } from "react";
import AddModeratorTwoToneIcon from "@mui/icons-material/AddModeratorTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import axios from "axios";
import { PageLoader } from "../../Common";
import { SetTitle } from "../../../../../Context/SysFuncs";
import { AdminAddAPI, AdminListerApi } from "../../../../../Context/ApiLinks";
import {
  AdminInfoStore,
  UserLoginStore,
  ActionMessageStore,
} from "../../../../../Store";
export default function NewStaff() {
  const setAdminList = AdminInfoStore((state) => state.setAdminList);
  const userRef = UserLoginStore((state) => state.userRef);
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const setsnackMessage = ActionMessageStore((state) => state.setsnackMessage);
  const setsnackSeverity = ActionMessageStore(
    (state) => state.setsnackSeverity
  );
  const [isLoading, setisLoading] = useState(true);
  const [GeneralInfo, setGeneralInfo] = useState({});
  useEffect(() => {
    SetTitle("Add SOC Staff");
    setGeneralInfo({
      username: "",
      user_reference: "",
      userpass: "",
      refrence: "",
      fullname: "",
      jobpostition: "",
      emailaddress: "",
      fullname: "",
      phonenumber: "",
      managestaff: 0,
      manageiom: 0,
      manageemployees: 0,
      managepayroll: 0,
      manageleaves: 0,
      manageevalutions: 0,
      managesysconfig: 0,
      adminref: userRef,
    });
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
  }, [setisLoading]);
  const handleGeneralInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralInfo({
      ...GeneralInfo,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleUpdate = async () => {
    const response = await axios.post(AdminAddAPI, GeneralInfo);
    const data = response.data;
    setsnackMessage(data.message);
    if (data.success) {
      setsnackSeverity("success");
      GrabData();
      setGeneralInfo({
        username: "",
        user_reference: "",
        userpass: "",
        refrence: "",
        fullname: "",
        jobpostition: "",
        emailaddress: "",
        fullname: "",
        phonenumber: "",
        managestaff: 0,
        manageiom: 0,
        manageemployees: 0,
        managepayroll: 0,
        manageleaves: 0,
        manageevalutions: 0,
        managesysconfig: 0,
        adminref: userRef,
      });
    } else {
      setsnackSeverity("error");
    }
    setsanckShow(true);
  };
  const GrabData = () => {
    axios
      .get(AdminListerApi)
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setAdminList(response.data);
        } else {
          console.warn("Unexpected response format", response);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch admin list:", error);
      });
  };
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={true}
        subname="SOC Staff"
        sublink="/admin/socstaff"
        finalname="New Staff"
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Box sx={{ my: 2 }}>
            <Typography
              variant="h6"
              color={colors.blueGrey[700]}
              display={"flex"}
              alignItems={"center"}
            >
              <AddModeratorTwoToneIcon sx={{ mr: 2 }} />
              Add SOC Staff
            </Typography>
          </Box>
          <Paper elevation={3} sx={{ py: 2, px: 1 }}>
            <Typography variant="h6" color={colors.blueGrey[500]} flexGrow={1}>
              Admin info
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              <Grid size={3}>
                <TextField
                  label="Fullname"
                  name="fullname"
                  size="small"
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-input": {
                      fontSize: "13",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                  fullWidth
                  value={GeneralInfo.fullname || ""}
                  onChange={handleGeneralInfoChange}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="Job Position"
                  name="jobpostition"
                  size="small"
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                  fullWidth
                  value={GeneralInfo.jobpostition || ""}
                  onChange={handleGeneralInfoChange}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="E-mail Address"
                  name="emailaddress"
                  size="small"
                  type="email"
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                  fullWidth
                  value={GeneralInfo.emailaddress || ""}
                  onChange={handleGeneralInfoChange}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="Phone Number"
                  name="phonenumber"
                  size="small"
                  type="phone"
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                  fullWidth
                  value={GeneralInfo.phonenumber || ""}
                  onChange={handleGeneralInfoChange}
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" color={colors.blueGrey[500]}>
                  Privileges
                </Typography>
              </Grid>
              {[
                {
                  label: "SOC Staff",
                  name: "managestaff",
                  val: GeneralInfo.managestaff,
                },
                {
                  label: "IOM HR",
                  name: "manageiom",
                  val: GeneralInfo.manageiom,
                },
                {
                  label: "Employees",
                  name: "manageemployees",
                  val: GeneralInfo.manageemployees,
                },
                {
                  label: "Payroll",
                  name: "managepayroll",
                  val: GeneralInfo.managepayroll,
                },
                {
                  label: "Leaves",
                  name: "manageleaves",
                  val: GeneralInfo.manageleaves,
                },
                {
                  label: "Evalutions",
                  name: "manageevalutions",
                  val: GeneralInfo.manageevalutions,
                },
                {
                  label: "System Configs & Logs",
                  name: "managesysconfig",
                  val: GeneralInfo.managesysconfig,
                },
              ].map((privilege) => (
                <Grid key={privilege.name} size={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        checked={privilege.val}
                        onChange={handleGeneralInfoChange}
                        name={privilege.name}
                      />
                    }
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                      },
                      px: 2,
                    }}
                    label={privilege.label}
                  />
                </Grid>
              ))}
              <Grid size={12}>
                <Typography variant="h6" color={colors.blueGrey[500]}>
                  Account Information
                </Typography>
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Uername"
                  name="username"
                  size="small"
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                  fullWidth
                  value={GeneralInfo.username || ""}
                  onChange={handleGeneralInfoChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Password"
                  name="userpass"
                  size="small"
                  type="password"
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                  fullWidth
                  value={GeneralInfo.userpass || ""}
                  onChange={handleGeneralInfoChange}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={12} sx={{ textAlign: "end" }}>
                <Button variant="contained" onClick={handleUpdate} size="small">
                  <SaveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Save SOC
                  Staff
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </Box>
  );
}
