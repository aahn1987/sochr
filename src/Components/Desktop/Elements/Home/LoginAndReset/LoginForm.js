import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { Img } from "react-image";
import { CircleLoader } from "../../../../Common/Loaders";
import LOGO from "../../../../../Assets/IMG/logo.png";
import { Navigate, NavLink, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import md5 from "md5";
import { ActionMessageStore, UserLoginStore } from "../../../../../Store";
import Cookies from "js-cookie";
export default function LoginForm() {
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const setsnackMessage = ActionMessageStore((state) => state.setsnackMessage);
  const setsnackSeverity = ActionMessageStore(
    (state) => state.setsnackSeverity
  );
  const setuserRole = UserLoginStore((state) => state.setuserRole);
  const setuserRef = UserLoginStore((state) => state.setuserRef);
  const setempSOC = UserLoginStore((state) => state.setempSOC);
  const setisLoggedIn = UserLoginStore((state) => state.setisLoggedIn);
  const [formData, setFormData] = useState({
    username: "",
    userpass: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    event.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const encryptedData = {
      username: formData.username,
      userpass: md5(formData.userpass).toString(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/account/login",
        encryptedData
      );
      const result = [response.data];
      result.forEach((item) => {
        setsnackMessage(item.message);
        if (item.success || item.LOGGED === 1) {
          Cookies.set("loggedIn", true, { expires: 30, path: "/" });
          Cookies.set("userRole", item.userrole, {
            expires: 30,
            path: "/",
          });
          Cookies.set("userRef", item.user_reference, {
            expires: 30,
            path: "/",
          });
          setuserRole(item.userrole);
          setuserRef(item.user_reference);
          setisLoggedIn(true);
          setsnackSeverity("success");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          setsnackSeverity("error");
        }
        setsanckShow(true);
      });
    } catch (error) {
      console.log({
        success: false,
        error: error.message || "Request failed",
      });
    }
    setLoading(false);
  };
  return (
    <Paper elevation={3} sx={{ width: "25%", p: 3, borderRadius: "10%" }}>
      <Box textAlign={"center"}>
        <Img className="LoginImage" src={LOGO} loader={<CircleLoader />} />
      </Box>
      <Box textAlign={"center"}>
        <Typography color="primary" variant="h6" sx={{ mt: 2, mb: 3 }}>
          Login to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            id="username"
            size="small"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            size="small"
            name="userpass"
            value={formData.userpass}
            onChange={handleChange}
            required
            label="Password"
            type="password"
            id="userpass"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <NavLink className="resetlink" to="/reset">
              Forgot Your Password ?
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
