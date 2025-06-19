import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ResetPage,
  Leave,
  Evaluation,
  Objective,
} from "../Pages/Home";

import { NotFound } from "../../Common/Bars/Desktop";
import { Box } from "@mui/material";
const NFcontianer = () => {
  return (
    <Box
      component="main"
      display={"flex"}
      height={"100vh"}
      width={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <NotFound />
    </Box>
  );
};
export default function PortalHomeContainer() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/leave/:token/*" element={<Leave />} />
      <Route path="/evaluation/:token/*" element={<Evaluation />} />
      <Route path="/objective/:token/*" element={<Objective />} />
      <Route path="/leave/:token/" element={<NFcontianer />} />
      <Route path="/evaluation/:token/" element={<NFcontianer />} />
      <Route path="/objective/:token/" element={<NFcontianer />} />
      <Route path="*" element={<NFcontianer />} />
    </Routes>
  );
}
