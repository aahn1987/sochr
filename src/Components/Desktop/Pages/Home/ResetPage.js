import { Container, Box } from "@mui/material";
import {
  LoginHeader,
  ResetForm,
  LoginFooter,
} from "../../Elements/Home/LoginAndReset";
import { ActionMessage } from "../../Elements/Common/";
import { UserLoginStore } from "../../../../Store";
import { Navigate } from "react-router-dom";

export default function ResetPage() {
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
            <ResetForm />
            <LoginFooter />
            <ActionMessage />
          </Box>
        </Container>
      )}
    </>
  );
}
