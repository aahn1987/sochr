import { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { BASEURI } from "../../../Context/SysConfs";
import {
  AdminInfoStore,
  UserLoginStore,
  ActionMessageStore,
} from "../../../Store";
import {
  TopBar,
  PageLoader,
  Navigation,
  NotFound,
} from "../../Common/Bars/Desktop/";
import { AdminInfoApi } from "../../../Context/ApiLinks";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import {
  Account,
  ChangeLogs,
  Configs,
  Dashboard,
  Employees,
  Evaluations,
  HealthInsurance,
  HR,
  Leaves,
  Logs,
  Payroll,
  Staff,
  Tutorials,
} from "../Pages/Admin";

export default function AdminContainer() {
  const setadminData = AdminInfoStore((state) => state.setadminData);
  const userRole = UserLoginStore((state) => state.userRole);
  const userRef = UserLoginStore((state) => state.userRef);
  const isPageloading = ActionMessageStore((state) => state.isPageloading);
  const setisPageloading = ActionMessageStore(
    (state) => state.setisPageloading
  );
  useEffect(() => {
    if (userRole != "admin") {
      window.location.href = BASEURI + userRole;
    } else {
      setisPageloading(true);
      const fetchAdminInfo = async () => {
        try {
          const response = await axios.post(AdminInfoApi, {
            refrence: userRef,
          });
          setadminData(response.data);
        } catch (err) {
          console.error("Failed to fetch admin info");
        } finally {
          setisPageloading(false);
        }
      };
      setTimeout(() => {
        fetchAdminInfo();
      }, 3000);
    }
  }, [userRole]);
  return (
    /*
<>
      {isPageloading ? (
        <PageLoader />
      ) : (
        <Box component="main" display={"flex"} height={"100vh"}>
          <Box sx={{ width: "240px" }}>
            <Navigation />
          </Box>
          <Box
            sx={{ flexGrow: 1, p: 3 }}
            display={"flex"}
            flexDirection={"column"}
          >
            <TopBar />
            <Box flexGrow={1}>1</Box>
          </Box>
        </Box>
      )}
    </>
    */
    <Box component="main" display={"flex"} width={"100vw"}>
      <Box sx={{ width: "240px" }}>
        <Navigation />
      </Box>
      <Box
        sx={{ flexGrow: 1, px: 1 }}
        display={"flex"}
        flexDirection={"column"}
        height={"100vh"}
        overflow={"none"}
      >
        <TopBar />
        <Box className="sitContent">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="socstaff/*" element={<Staff />} />
            <Route path="iomhr/*" element={<HR />} />
            <Route path="employees/*" element={<Employees />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="evaluations" element={<Evaluations />} />
            <Route path="configuration/*" element={<Configs />} />
            <Route path="logs" element={<Logs />} />
            <Route path="account" element={<Account />} />
            <Route path="healthinsurance" element={<HealthInsurance />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="changelogs" element={<ChangeLogs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
