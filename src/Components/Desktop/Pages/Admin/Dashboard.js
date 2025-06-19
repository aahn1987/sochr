import { Container } from "@mui/material";
import { BreadCrumber } from "../../../Common/Bars/Desktop";
export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={false}
        finalname="Dashboard"
      />
    </Container>
  );
}
