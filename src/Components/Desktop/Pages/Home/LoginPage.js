import { Container, Box } from "@mui/material";
import {
  LoginHeader,
  LoginForm,
  LoginFooter,
} from "../../Elements/Home/LoginAndReset";
import { ActionMessage } from "../../Elements/Common/";
export default function LoginPage() {
  return (
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
  );
}
