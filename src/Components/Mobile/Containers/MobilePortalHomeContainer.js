import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ResetPage,
  Leave,
  Evaluation,
  Objective,
} from "../Pages/Home";
export default function MobilePortalHomeContainer() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/leave/:token/*" element={<Leave />} />
      <Route path="/evaluation/:token/*" element={<Evaluation />} />
      <Route path="/objective/:token/*" element={<Objective />} />
    </Routes>
  );
}
