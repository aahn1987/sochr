import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  colors,
  Paper,
  Divider,
  Grid,
  Alert,
} from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { useEffect, useState } from "react";
import GroupRemoveTwoToneIcon from "@mui/icons-material/GroupRemoveTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import axios from "axios";
import { PageLoader } from "../../Common";
import { SetTitle } from "../../../../../Context/SysFuncs";
import {
  IOMHRAccountAPI,
  IOMHRDeleteAPI,
  IOMHRGetAPI,
  IOMHREditAPI,
  IOMHRListerAPI,
} from "../../../../../Context/ApiLinks";
import {
  IOMHRStore,
  UserLoginStore,
  ActionMessageStore,
} from "../../../../../Store";
import { useNavigate, useParams } from "react-router-dom";

export default function EditHR() {
  const setHRList = IOMHRStore((state) => state.setHRList);
  const HRInfo = IOMHRStore((state) => state.HRInfo);
  const setHRInfo = IOMHRStore((state) => state.setHRInfo);
  const userRef = UserLoginStore((state) => state.userRef);
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const setsnackMessage = ActionMessageStore((state) => state.setsnackMessage);
  const setsnackSeverity = ActionMessageStore(
    (state) => state.setsnackSeverity
  );
  const [isLoading, setisLoading] = useState(true);
  const [GeneralInfo, setGeneralInfo] = useState({});
  const [open, setOpen] = useState(false);
  const { eid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(IOMHRGetAPI, { refrence: eid })
      .then((res) => {
        setHRInfo(res.data);
        const fullname = res.data?.fullname;
        SetTitle("Edit IOM HR" + fullname);
        setGeneralInfo({
          adminref: userRef,
          refrence: res.data.refrence,
          fullname: res.data.fullname,
          emailaddress: res.data.emailaddress,
          phonenumber: res.data.phonenumber,
          username: res.data.username,
          userpass: "",
          user_reference: res.data.refrence,
        });
        setTimeout(() => {
          setisLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error fetching admin info:", err);
      });
  }, [eid, setHRInfo]);
  const handleGeneralInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralInfo({
      ...GeneralInfo,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleUpdate = async () => {
    const response = await axios.post(IOMHREditAPI, GeneralInfo);
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
    const response = await axios.post(IOMHRAccountAPI, GeneralInfo);
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
      .get(IOMHRListerAPI)
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setHRList(response.data);
        } else {
          console.warn("Unexpected response format", response);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch admin list:", error);
      });
  };
  const handleDelete = async () => {
    const response = await axios.post(IOMHRDeleteAPI, GeneralInfo);
    const data = response.data;
    setsnackMessage(data.message);
    if (data.success) {
      setsnackSeverity("success");
      GrabData();
      handleClose();
      setTimeout(() => {
        navigate("/admin/iomhr");
      }, 3000);
    } else {
      setsnackSeverity("error");
    }
    setsanckShow(true);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={true}
        subname="IOM HR"
        sublink="/admin/iomhr"
        finalname={"Edit IOM HR " + HRInfo.fullname}
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
              <GroupRemoveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Edit
              IOM HR {HRInfo.fullname}
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
                <DeleteTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Delete IOM
                HR
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              <Grid size={4}>
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
              <Grid size={4}>
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
              <Grid size={4}>
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
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={12} sx={{ textAlign: "end" }}>
                <Button variant="contained" onClick={handleUpdate} size="small">
                  <SaveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Save IOM
                  HR
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Box sx={{ mt: 1 }}></Box>
          <Paper elevation={3} sx={{ py: 2, px: 1 }}>
            <Typography variant="h6" color={colors.blueGrey[500]} flexGrow={1}>
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
                <Button
                  variant="contained"
                  onClick={handleUpdateUser}
                  size="small"
                >
                  <SaveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Save IOM
                  HR
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
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
            Are you sure you want to delete IOM HR {GeneralInfo.fullname}
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
    </Box>
  );
}
