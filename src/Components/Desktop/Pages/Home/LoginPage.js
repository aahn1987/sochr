import { Container, Box } from "@mui/material";
import {
  LoginHeader,
  LoginForm,
  LoginFooter,
} from "../../Elements/Home/LoginAndReset";
import { ActionMessage } from "../../Elements/Common/";
import { UserLoginStore } from "../../../../Store";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const isLoggedIn = UserLoginStore((state) => state.isLoggedIn);
  const userRole = UserLoginStore((state) => state.userRole);
  return (
    <>
      {isLoggedIn ? (
        <Navigate to={"/" + userRole} />
      ) : (
        <Container
          maxWidth={false}
          disableGutters
          sx={{ width: "100%" }}
          className="loginContainer"
        >
          <Box
            className="logintent"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
            <ActionMessage />
          </Box>
        </Container>
      )}
    </>
  );
}
