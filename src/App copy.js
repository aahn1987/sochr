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
      main: "#32337b",
    },
    secondary: {
      main: "#f37021",
    },
  },
});
export default function App() {
  const isLoggedIn = UserLoginStore((state) => state.isLoggedIn);
  const userRole = UserLoginStore((state) => state.userRole);
  const NavLinkToGo = () => {
    return <Navigate to={"/" + userRole} />;
  };
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
          <Route
            index
            path="/*"
            element={!isLoggedIn ? <PortalHomeContainer /> : <NavLinkToGo />}
          />
          <Route path="/admin/*" element={<AdminContainer />} />
          <Route path="/organization/*" element={<CompanyContainer />} />
          <Route path="/employee/*" element={<EmployeeContainer />} />
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
          <Route
            index
            element={
              !isLoggedIn ? <MobilePortalHomeContainer /> : <NavLinkToGo />
            }
          />
          <Route path="/*" element={<MobilePortalHomeContainer />} />
          <Route path="/admin/*" element={<MobileAdminContainer />} />
          <Route path="/organization/*" element={<MobileCompanyContainer />} />
          <Route path="/employee/*" element={<MobileEmployeeContainer />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
