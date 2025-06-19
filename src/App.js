import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AdminContainer,
  CompanyContainer,
  EmployeeContainer,
  PortalHomeContainer,
} from "./Components/Desktop/Containers";
import {
  MobileAdminContainer,
  MobileCompanyContainer,
  MobileEmployeeContainer,
  MobilePortalHomeContainer,
} from "./Components/Mobile/Containers";
import { UserLoginStore } from "./Store";
const theme = createTheme({
  palette: {
    primary: {
      main: "#9e9e9e",
    },
    secondary: {
      main: "#2e3192",
    },
  },
});
export default function App() {
  const isLoggedIn = UserLoginStore((state) => state.isLoggedIn);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <Routes>
          <Route path="/*" element={<PortalHomeContainer />} />
          <Route
            path="/admin/*"
            element={
              isLoggedIn ? <AdminContainer /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/organization/*"
            element={
              isLoggedIn ? <CompanyContainer /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/employee/*"
            element={
              isLoggedIn ? <EmployeeContainer /> : <Navigate to={"/login"} />
            }
          />
        </Routes>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <Routes>
          <Route path="/*" element={<MobilePortalHomeContainer />} />
          <Route
            path="/admin/*"
            element={
              isLoggedIn ? <MobileAdminContainer /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/organization/*"
            element={
              isLoggedIn ? (
                <MobileCompanyContainer />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/employee/*"
            element={
              isLoggedIn ? (
                <MobileEmployeeContainer />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
