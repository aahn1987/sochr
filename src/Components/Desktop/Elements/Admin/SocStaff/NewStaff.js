import { Box } from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";

export default function NewStaff() {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={true}
        subname="SOC Staff"
        sublink="/admin/socstaff"
        finalname="New Staff"
      />
    </Box>
  );
}
