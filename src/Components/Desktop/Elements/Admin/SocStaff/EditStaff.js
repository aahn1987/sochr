import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  colors,
  Paper,
  Divider,
  Alert,
  Grid,
} from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  AdminInfoStore,
  UserLoginStore,
  ActionMessageStore,
} from "../../../../../Store";
import {
  AdminGetAPI,
  AdminEditAPI,
  AdminDeleteAPI,
  AdminAccountAPI,
  AdminListerApi,
} from "../../../../../Context/ApiLinks";
import { useEffect, useState } from "react";
import { SetTitle } from "../../../../../Context/SysFuncs";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { PageLoader } from "../../Common";

export default function EditStaff() {
  const setAdminList = AdminInfoStore((state) => state.setAdminList);
  const setAdminInfo = AdminInfoStore((state) => state.setAdminInfo);
  const adminInfo = AdminInfoStore((state) => state.adminInfo);
  const userRef = UserLoginStore((state) => state.userRef);
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const setsnackMessage = ActionMessageStore((state) => state.setsnackMessage);
  const setsnackSeverity = ActionMessageStore(
    (state) => state.setsnackSeverity
  );
  const [GeneralInfo, setGeneralInfo] = useState({});
  const [AccountInfo, setAccountInfo] = useState({ userpass: "" });
  const [isLoading, setisLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { eid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(AdminGetAPI, { refrence: eid })
      .then((res) => {
        setAdminInfo(res.data);
        const fullname = res.data?.fullname;
        SetTitle("Edit Soc Staff" + fullname);
        setGeneralInfo({
          refrence: res.data.refrence,
          fullname: res.data.fullname,
          jobpostition: res.data.jobpostition,
          emailaddress: res.data.emailaddress,
          fullname: res.data.fullname,
          phonenumber: res.data.phonenumber,
          managestaff: res.data.manage_staff,
          manageiom: res.data.manage_iom,
          manageemployees: res.data.manage_employees,
          managepayroll: res.data.manage_payroll,
          manageleaves: res.data.manage_leaves,
          manageevalutions: res.data.manage_evalutions,
          managesysconfig: res.data.manage_sysconfig,
          adminref: userRef,
        });
        setAccountInfo({
          username: res.data.username,
          fullname: res.data.fullname,
          user_reference: res.data.refrence,
          userpass: "",
          adminref: userRef,
        });
        setTimeout(() => {
          setisLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error fetching admin info:", err);
      });
  }, [eid, setAdminInfo]);
  const handleGeneralInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralInfo({
      ...GeneralInfo,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleAccountInfoChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({ ...AccountInfo, [name]: value });
  };
  const handleUpdate = async () => {
    const response = await axios.post(AdminEditAPI, GeneralInfo);
    const data = response.data;
    setsnackMessage(data.message);
    if (data.success) {
      setsnackSeverity("success");
      GrabData();
    } else {
      setsnackSeverity("error");
    }
    setsanckShow(true);
  };
  const handleUpdateUser = async () => {
    const response = await axios.post(AdminAccountAPI, AccountInfo);
    const data = response.data;
    setsnackMessage(data.message);
    if (data.success) {
      setsnackSeverity("success");
      GrabData();
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
  const handleDelete = async () => {
    const response = await axios.post(AdminDeleteAPI, GeneralInfo);
    const data = response.data;
    setsnackMessage(data.message);
    if (data.success) {
      setsnackSeverity("success");
      GrabData();
      handleClose();
      setTimeout(() => {
        navigate("/admin/socstaff");
      }, 3000);
    } else {
      setsnackSeverity("error");
    }
    setsanckShow(true);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <BreadCrumber
          mainlink="/admin"
          mainname="Admin Panel"
          hassub={true}
          subname="SOC Staff"
          sublink="/admin/socstaff"
          finalname={"Edit SOC Staff " + adminInfo.fullname}
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
                <VerifiedUserTwoToneIcon sx={{ mr: 2 }} />
                Edit SOC Staff {adminInfo.fullname}
              </Typography>
            </Box>
            <Paper elevation={3} sx={{ py: 2, px: 1 }}>
              <Box display={"flex"} marginBottom={1}>
                <Typography
                  variant="h6"
                  color={colors.blueGrey[500]}
                  flexGrow={1}
                >
                  Personal info
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={handleOpen}
                >
                  <DeleteTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Delete
                  SOC Staff
                </Button>
              </Box>
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
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={12} sx={{ textAlign: "end" }}>
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    size="small"
                  >
                    <SaveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Save SOC
                    Staff
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Box sx={{ mt: 1 }}></Box>
            <Paper elevation={3} sx={{ py: 2, px: 1 }}>
              <Typography
                variant="h6"
                color={colors.blueGrey[500]}
                flexGrow={1}
              >
                Account Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
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
                    value={AccountInfo.username || ""}
                    onChange={handleAccountInfoChange}
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
                    value={AccountInfo.userpass || ""}
                    onChange={handleAccountInfoChange}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={12} sx={{ textAlign: "end" }}>
                  <Button
                    variant="contained"
                    onClick={handleUpdateUser}
                    size="small"
                  >
                    <SaveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Save SOC
                    Staff
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Admin {GeneralInfo.fullname}
        </DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          <Alert variant="outlined" severity="error">
            Are you sure you want to delete admin {GeneralInfo.fullname}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Box flexGrow={1}></Box>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
