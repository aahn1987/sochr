import {
  Box,
  Button,
  TextField,
  Typography,
  colors,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { useEffect, useState } from "react";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import axios from "axios";
import { PageLoader } from "../../Common";
import { SetTitle } from "../../../../../Context/SysFuncs";
import { IOMHRAddAPI, IOMHRListerAPI } from "../../../../../Context/ApiLinks";
import {
  IOMHRStore,
  UserLoginStore,
  ActionMessageStore,
} from "../../../../../Store";

export default function AddHR() {
  const setHRList = IOMHRStore((state) => state.setHRList);
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
      fullname: "",
      emailaddress: "",
      phonenumber: "",
      username: "",
      userpass: "",
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
    const response = await axios.post(IOMHRAddAPI, GeneralInfo);
    const data = response.data;
    setsnackMessage(data.message);
    if (data.success) {
      setsnackSeverity("success");
      GrabData();
      setGeneralInfo({
        fullname: "",
        emailaddress: "",
        phonenumber: "",
        username: "",
        userpass: "",
        adminref: userRef,
      });
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
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={true}
        subname="IOM HR"
        sublink="/admin/iomhr"
        finalname="New IOM HR"
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
              <GroupAddTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Add New
              IOM HR
            </Typography>
          </Box>
          <Paper elevation={3} sx={{ py: 2, px: 1 }}>
            <Typography variant="h6" color={colors.blueGrey[500]} flexGrow={1}>
              Personal info
            </Typography>
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
                  <SaveTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Save IOM
                  HR
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </Box>
  );
}
