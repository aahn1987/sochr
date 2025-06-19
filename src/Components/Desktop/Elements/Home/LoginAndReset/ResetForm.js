import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { Img } from "react-image";
import { CircleLoader } from "../../../../Common/Loaders";
import LOGO from "../../../../../Assets/IMG/logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ActionMessageStore } from "../../../../../Store";
import { ResetAPI } from "../../../../../Context/ApiLinks";

export default function ResetForm() {
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const setsnackMessage = ActionMessageStore((state) => state.setsnackMessage);
  const setsnackSeverity = ActionMessageStore(
    (state) => state.setsnackSeverity
  );

  // Form State
  const [formData, setFormData] = useState({
    username: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(ResetAPI, formData);
      const data = response.data;
      setsnackMessage(data.message);
      if (data.success) {
        setsnackSeverity("success");
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
          Reset your account
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
          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Account"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <NavLink className="resetlink" to="/login">
              Back to login
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
