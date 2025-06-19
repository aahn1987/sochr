import { Box } from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";

export default function ListStaff() {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={false}
        finalname="SOC Staff"
      />
    </Box>
  );
}
