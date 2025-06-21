import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { Img } from "react-image";
import { CircleLoader } from "../../../../Common/Loaders";
import LOGO from "../../../../../Assets/IMG/logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import md5 from "md5";
import Cookies from "js-cookie";
import { ActionMessageStore, UserLoginStore } from "../../../../../Store";
import { LoginAPI, GetSOCAPI } from "../../../../../Context/ApiLinks";
import { sendFcmTokenToLaravel } from "../../../../../Context/SysFuncs";

export default function LoginForm() {
  // Zustand State Functions
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const setsnackMessage = ActionMessageStore((state) => state.setsnackMessage);
  const setsnackSeverity = ActionMessageStore(
    (state) => state.setsnackSeverity
  );

  const setuserRole = UserLoginStore((state) => state.setuserRole);
  const setuserRef = UserLoginStore((state) => state.setuserRef);
  const setempSOC = UserLoginStore((state) => state.setempSOC);
  const setisLoggedIn = UserLoginStore((state) => state.setisLoggedIn);

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    userpass: "",
  });

  const [loading, setLoading] = useState(false);

  // Input Handler
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const encryptedData = {
      username: formData.username,
      userpass: md5(formData.userpass).toString(),
    };

    try {
      const response = await axios.post(LoginAPI, encryptedData);
      const data = response.data;

      setsnackMessage(data.message);

      if (data.success) {
        // Save cookies
        Cookies.set("loggedIn", true, { expires: 30, path: "/" });
        Cookies.set("userRole", data.userrole, { expires: 30, path: "/" });
        Cookies.set("userRef", data.user_reference, { expires: 30, path: "/" });

        // Update Zustand state
        setuserRole(data.userrole);
        setuserRef(data.user_reference);

        // Handle employee-specific SOC logic
        if (data.userrole === "employee") {
          try {
            const socResponse = await axios.post(GetSOCAPI, {
              employee_reference: data.user_reference,
            });

            const soc = socResponse.data;

            Cookies.set("empSOC", soc.soc_reference, {
              expires: 30,
              path: "/",
            });
            setempSOC(soc.soc_reference);
            sendFcmTokenToLaravel(soc.soc_reference);
          } catch (socErr) {
            console.error("Error fetching SOC reference:", socErr);
          }
        }

        setsnackSeverity("success");

        // Delay redirection by 5 seconds
        setTimeout(() => {
          setisLoggedIn(true);
        }, 5000);
      } else {
        setsnackSeverity("error");
      }

      setsanckShow(true);
    } catch (err) {
      setsnackMessage("Login failed. Please try again.");
      setsnackSeverity("error");
      setsanckShow(true);
      console.error("Login error:", err);
    }

    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ width: "25%", p: 3, borderRadius: "10%" }}>
      <Box textAlign="center">
        <Img className="LoginImage" src={LOGO} loader={<CircleLoader />} />
        <Typography color="secondary" variant="h6" sx={{ mt: 2, mb: 3 }}>
          Login to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
            color="secondary"
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
            color="secondary"
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
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <NavLink className="resetlink" to="/reset">
              Forgot Your Password?
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
